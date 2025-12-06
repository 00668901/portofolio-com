'use server';
/**
 * @fileOverview A flow to dynamically generate a new UI theme.
 *
 * - generateTheme - Generates a new color palette for light and dark themes.
 * - GenerateThemeOutput - The return type for the generateTheme function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateThemeOutputSchema, type GenerateThemeOutput } from '@/lib/types';


export async function generateTheme(): Promise<GenerateThemeOutput> {
  return generateThemeFlow();
}

const generateThemePrompt = ai.definePrompt({
  name: 'generateThemePrompt',
  output: { schema: GenerateThemeOutputSchema },
  prompt: `You are an expert UI/UX designer specializing in color theory. Generate a complete, modern, and aesthetically pleasing color palette for a personal portfolio website.

  You must provide two full themes: 'light' and 'dark'.

  For each theme, you must provide a value for every color defined in the schema. The values must be a string of three numbers representing HSL, without the 'hsl()' wrapper. For example, for a pure red, you should provide "0 100% 50%".

  Ensure the generated colors have good contrast ratios and are accessible. The palette should be professional and suitable for showcasing creative work. Do not use the default blue/purple theme. Be creative and unique.`,
  config: {
    temperature: 1,
  },
});

const generateThemeFlow = ai.defineFlow(
  {
    name: 'generateThemeFlow',
    outputSchema: GenerateThemeOutputSchema,
  },
  async () => {
    const { output } = await generateThemePrompt();
    return output!;
  }
);
