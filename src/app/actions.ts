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
    // We'll save the contact message to the AI chat log for the owner to see.
    // This avoids needing a paid Firebase Extension for sending emails.
    // We need an author ID for the path, we can use a hardcoded one or a dynamic one.
    // For this portfolio, let's assume a single author. We can use a simplified author ID.
    const authorId = 'main_author'; // A fixed ID for the portfolio owner.
    const chatMessagesRef = collection(firestore, 'authorProfiles', authorId, 'aiChatMessages');
    
    const userMessage = `New Contact Form Submission:\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const aiResponse = "Thank you for the message. This has been noted for the portfolio owner.";

    // Using non-blocking update for better UX
    addDocumentNonBlocking(chatMessagesRef, {
      authorProfileId: authorId,
      userMessage: userMessage,
      aiResponse: aiResponse,
      timestamp: serverTimestamp(),
      recommendedMessage: false, // This was not a recommended prompt
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
