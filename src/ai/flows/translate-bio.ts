'use server';

/**
 * @fileOverview Translates the author's bio into a specified language.
 *
 * - translateBio - A function that translates the bio.
 * - TranslateBioInput - The input type for the translateBio function.
 * - TranslateBioOutput - The return type for the translateBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateBioInputSchema = z.object({
  existingBio: z.string().describe('The existing author bio to be translated.'),
  targetLanguage: z.string().describe('The target language for the translation, e.g., "Indonesian", "French".'),
});
export type TranslateBioInput = z.infer<typeof TranslateBioInputSchema>;

const TranslateBioOutputSchema = z.object({
  translatedBio: z.string().describe('The bio translated into the target language.'),
});
export type TranslateBioOutput = z.infer<typeof TranslateBioOutputSchema>;

export async function translateBio(input: TranslateBioInput): Promise<TranslateBioOutput> {
  return translateBioFlow(input);
}

const translateBioPrompt = ai.definePrompt({
  name: 'translateBioPrompt',
  input: {schema: TranslateBioInputSchema},
  output: {schema: TranslateBioOutputSchema},
  prompt: `You are an expert translator. Translate the following biography into {{targetLanguage}}.
Do not add any extra commentary or niceties. Only provide the translated text in the 'translatedBio' field.

Biography to translate:
"{{{existingBio}}}"
`,
  config: {
    temperature: 0.2,
  },
});

const translateBioFlow = ai.defineFlow(
  {
    name: 'translateBioFlow',
    inputSchema: TranslateBioInputSchema,
    outputSchema: TranslateBioOutputSchema,
  },
  async input => {
    const {output} = await translateBioPrompt(input);
    return output!;
  }
);
