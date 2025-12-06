'use server';
/**
 * @fileOverview Translates the entire website content.
 *
 * - translateWebsite - A function that translates all major text content of the website.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { WebsiteContentSchema, TranslateWebsiteInputSchema, TranslateWebsiteOutputSchema, type TranslateWebsiteOutput, type TranslateWebsiteInput } from '@/lib/types';


export async function translateWebsite(
  input: TranslateWebsiteInput
): Promise<TranslateWebsiteOutput> {
  return translateWebsiteFlow(input);
}

const translateWebsitePrompt = ai.definePrompt({
  name: 'translateWebsitePrompt',
  input: { schema: TranslateWebsiteInputSchema },
  output: { schema: TranslateWebsiteOutputSchema },
  prompt: `You are an expert translator. Translate the following JSON object containing website content into {{targetLanguage}}.

  IMPORTANT:
  - Translate all user-facing text fields: 'name', 'title', 'bio', 'description', 'heroTitle', 'heroSubtitle', 'viewWorkButton'.
  - Do NOT translate any other fields, especially IDs, URLs, or hints. Return them as they are.
  - Your response MUST be a valid JSON object that strictly adheres to the provided output schema.

  JSON to translate:
  \`\`\`json
  {{{json content}}}
  \`\`\`
  `,
  config: {
    temperature: 0.2,
  },
});

const translateWebsiteFlow = ai.defineFlow(
  {
    name: 'translateWebsiteFlow',
    inputSchema: TranslateWebsiteInputSchema,
    outputSchema: TranslateWebsiteOutputSchema,
  },
  async (input) => {
    const { output } = await translateWebsitePrompt(input);
    return output!;
  }
);
