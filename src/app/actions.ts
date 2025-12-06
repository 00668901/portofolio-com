"use server";

import Handlebars from "handlebars";
import {
  generateAlternativeProjectDescriptions,
  GenerateAlternativeProjectDescriptionsInput,
} from "@/ai/flows/generate-alternative-project-descriptions";
import { liveChat, LiveChatInput } from "@/ai/flows/live-chat-flow";
import { generateTheme } from "@/ai/flows/generate-ui-theme";
import { translateWebsite } from "@/ai/flows/translate-website";
import { collection, serverTimestamp } from "firebase/firestore";
import { initializeFirebase } from "@/firebase";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import type { GenerateThemeOutput, TranslateWebsiteInput, ContactFormSchema } from "@/lib/types";
import { author, projects } from "@/lib/data";
import { translateBio } from "@/ai/flows/translate-bio";
import type { TranslateBioInput } from "@/ai/flows/translate-bio";


export async function handleGenerateDescription(
  input: GenerateAlternativeProjectDescriptionsInput
) {
  return await generateAlternativeProjectDescriptions(input);
}

export async function handleTranslateBio(input: TranslateBioInput) {
    if (!input.targetLanguage || input.targetLanguage.toLowerCase().startsWith('en')) {
        return { translatedBio: input.existingBio };
    }
    return await translateBio(input);
}

export async function handleLiveChat(input: Omit<LiveChatInput, 'name' | 'author' | 'projects'>) {
  // Pre-process history to add a user-friendly label for the prompt
  const processedHistory = input.history.map(message => ({
    ...message,
    label: message.role === 'user' ? 'User' : 'Assistant',
  }));

  return await liveChat({
    ...input,
    history: processedHistory, // Pass the processed history
    name: author.name,
    author: author,
    projects: projects,
  });
}

export async function handleGenerateTheme(): Promise<GenerateThemeOutput> {
  return await generateTheme();
}

export async function handleTranslateWebsite(input: TranslateWebsiteInput) {
    if (input.targetLanguage.toLowerCase().startsWith('en')) {
        return input.content;
    }
    return await translateWebsite(input);
}

export async function handleContactSubmit(formData: ContactFormSchema) {  
  try {
    const { firestore } = initializeFirebase();
    const contactMessagesRef = collection(firestore, 'contactMessages');
    
    // Using non-blocking update for better UX
    addDocumentNonBlocking(contactMessagesRef, {
      // Data for Trigger Email Extension
      to: "kurniawansteven429@gmail.com",
      message: {
        subject: `New message from ${formData.name} via your portfolio`,
        html: `
          <p>You have received a new message from your portfolio contact form.</p>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message}</p>
        `,
      },
      // Original data for your records
      ...formData,
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
