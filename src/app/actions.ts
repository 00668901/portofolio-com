"use server";

import { z } from "zod";
import {
  generateAuthorBioOptions,
  GenerateAuthorBioOptionsInput,
} from "@/ai/flows/generate-author-bio-options";
import {
  generateAlternativeProjectDescriptions,
  GenerateAlternativeProjectDescriptionsInput,
} from "@/ai/flows/generate-alternative-project-descriptions";
import {
    adjustPortfolioLayout,
    AdjustPortfolioLayoutInput,
} from "@/ai/flows/dynamically-adjust-portfolio-layout";
import { liveChat, LiveChatInput } from "@/ai/flows/live-chat-flow";
import { generateTheme } from "@/ai/flows/generate-ui-theme";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { initializeFirebase } from "@/firebase";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const ThemeColorsSchema = z.object({
  background: z.string().describe('The background color in HSL format (e.g., "231 60% 94%").'),
  foreground: z.string().describe('The foreground text color in HSL format.'),
  card: z.string().describe('The card background color in HSL format.'),
  cardForeground: z.string().describe('The card foreground text color in HSL format.'),
  popover: z.string().describe('The popover background color in HSL format.'),
  popoverForeground: z.string().describe('The popover foreground text color in HSL format.'),
  primary: z.string().describe('The primary brand color in HSL format.'),
  primaryForeground: z.string().describe('The text color used on primary backgrounds in HSL format.'),
  secondary: z.string().describe('The secondary brand color in HSL format.'),
  secondaryForeground: z.string().describe('The text color used on secondary backgrounds in HSL format.'),
  muted: z.string().describe('The muted background color in HSL format.'),
  mutedForeground: z.string().describe('The muted foreground text color in HSL format.'),
  accent: z.string().describe('The accent color in HSL format.'),
  accentForeground: z.string().describe('The text color used on accent backgrounds in HSL format.'),
  destructive: z.string().describe('The destructive/error color in HSL format.'),
  destructiveForeground: z.string().describe('The text color used on destructive backgrounds in HSL format.'),
  border: z.string().describe('The border color in HSL format.'),
  input: z.string().describe('The input field background color in HSL format.'),
  ring: z.string().describe('The focus ring color in HSL format.'),
});

export const GenerateThemeOutputSchema = z.object({
  light: ThemeColorsSchema.describe('The full color palette for the light theme.'),
  dark: ThemeColorsSchema.describe('The full color palette for the dark theme.'),
});

export type GenerateThemeOutput = z.infer<typeof GenerateThemeOutputSchema>;

export async function handleGenerateBio(
  input: GenerateAuthorBioOptionsInput
) {
  return await generateAuthorBioOptions(input);
}

export async function handleGenerateDescription(
  input: GenerateAlternativeProjectDescriptionsInput
) {
  return await generateAlternativeProjectDescriptions(input);
}

export async function handleLayoutAdjustment(input: AdjustPortfolioLayoutInput) {
    return await adjustPortfolioLayout(input);
}

export async function handleLiveChat(input: LiveChatInput) {
  return await liveChat(input);
}

export async function handleGenerateTheme() {
  return await generateTheme();
}

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function handleContactSubmit(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid form data.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  
  try {
    const { firestore } = initializeFirebase();
    const contactMessagesRef = collection(firestore, 'contactMessages');
    
    // Using non-blocking update for better UX
    addDocumentNonBlocking(contactMessagesRef, {
      ...parsed.data,
      sentAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Error saving contact message:", error);
    return {
      success: false,
      message: "There was an error sending your message. Please try again later.",
    };
  }
}
