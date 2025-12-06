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
    };
  }

  // Here you would typically save the message to a database.
  // For this example, we'll just log it and return success.
  console.log("New contact message:", parsed.data);

  return {
    success: true,
    message: "Thank you for your message! I'll get back to you soon.",
  };
}
