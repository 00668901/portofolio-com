'use server';
/**
 * @fileOverview Translates the entire website content.
 *
 * - translateWebsite - A function that translates all major text content of the website.
 */

import { ai } from '@/ai/genkit';
import { TranslateWebsiteInputSchema, TranslateWebsiteOutputSchema, type TranslateWebsiteOutput, type TranslateWebsiteInput } from '@/lib/types';


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
  - Translate the value of all string fields EXCEPT for 'id', 'avatarUrl', 'imageUrl', 'imageHint', 'sourceUrl', and 'liveUrl'.
  - The entire 'author.contact' object, including all sub-fields like email, phone, and social URLs, should NOT be translated. Return it as is.
  - Your response MUST be a valid JSON object that strictly adheres to the provided output schema. Do not add any commentary.

  JSON to translate:
  \`\`\`json
  {{{json content}}}
  \`\`\`
  `,
  config: {
    temperature: 0.1,
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
