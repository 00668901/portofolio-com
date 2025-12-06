"use server";

import {
  generateAlternativeProjectDescriptions,
  GenerateAlternativeProjectDescriptionsInput,
} from "@/ai/flows/generate-alternative-project-descriptions";
import { liveChat, LiveChatInput } from "@/ai/flows/live-chat-flow";
import { generateTheme } from "@/ai/flows/generate-ui-theme";
import { translateWebsite } from "@/ai/flows/translate-website";
import type { GenerateThemeOutput, TranslateWebsiteInput, ContactFormSchema, WebsiteContent } from "@/lib/types";
import { author, projects } from "@/lib/data";
import { Resend } from 'resend';


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
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'kurniawansteven429@gmail.com',
      subject: `New message from ${formData.name}`,
      text: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    });
    
    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "There was an error sending your message. Please try again later.",
    };
  }
}
