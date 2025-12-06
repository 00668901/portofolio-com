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
import type { GenerateThemeOutput } from "@/lib/types";
import { author, projects } from "@/lib/data";

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

export async function handleLiveChat(input: Omit<LiveChatInput, 'name' | 'author' | 'projects'>) {
  return await liveChat({
    ...input,
    name: author.name,
    author: author,
    projects: projects,
  });
}

export async function handleGenerateTheme(): Promise<GenerateThemeOutput> {
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
