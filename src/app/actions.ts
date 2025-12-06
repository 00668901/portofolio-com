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
import type { GenerateThemeOutput, TranslateWebsiteInput, ContactFormSchema, WebsiteContent } from "@/lib/types";
import { author, projects } from "@/lib/data";


export async function handleGenerateDescription(
  input: GenerateAlternativeProjectDescriptionsInput
) {
  return await generateAlternativeProjectDescriptions(input);
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

export async function handleTranslateWebsite(input: TranslateWebsiteInput): Promise<WebsiteContent> {
    if (input.targetLanguage.toLowerCase().startsWith('en')) {
        return input.content;
    }
    const translated = await translateWebsite(input);

    const translatedProjects = input.content.projects.map((project, index) => {
        const translatedProject = translated.projects[index];
        return {
            ...project,
            title: translatedProject.title,
            description: translatedProject.description,
        };
    });

    return {
        ...input.content,
        ...translated,
        projects: translatedProjects,
    };
}

export async function handleContactSubmit(formData: ContactFormSchema) {  
  try {
    const { firestore } = initializeFirebase();
    const contactMessagesRef = collection(firestore, 'contactMessages');

    await addDocumentNonBlocking(contactMessagesRef, {
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
