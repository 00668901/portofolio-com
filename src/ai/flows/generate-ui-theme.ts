'use server';
/**
 * @fileOverview A flow to dynamically generate a new UI theme.
 *
 * - generateTheme - Generates a new color palette for light and dark themes.
 * - GenerateThemeOutput - The return type for the generateTheme function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { GenerateThemeOutput } from '@/app/actions';

const ThemeColorsSchema = z.object({
  background: z.string().describe('The background color in HSL format (e.g., "231 60% 94%").'),
  foreground: z.string().describe('The foreground text color in HSL format.'),
  card: z.string().describe('The card background color in HSL format.'),
  cardForeground: z.string().describe('The card foreground text color in HSL format.'),
  popover: z.string().describe('The popover background color in HSL format.'),
  popoverForeground: z.string().describe('The popover foreground text color in HSL format.'),
  primary: z.string().describe('The primary brand color in HSL format.'),
  primaryForeground: z.string().describe('The text color used on primary backgrounds in HSL format.'),
  secondary: z.string().describe('The secondary brand color in HSL format.'),
  secondaryForeground: z.string().describe('The text color used on secondary backgrounds in HSL format.'),
  muted: z.string().describe('The muted background color in HSL format.'),
  mutedForeground: z.string().describe('The muted foreground text color in HSL format.'),
  accent: z.string().describe('The accent color in HSL format.'),
  accentForeground: z.string().describe('The text color used on accent backgrounds in HSL format.'),
  destructive: z.string().describe('The destructive/error color in HSL format.'),
  destructiveForeground: z.string().describe('The text color used on destructive backgrounds in HSL format.'),
  border: z.string().describe('The border color in HSL format.'),
  input: z.string().describe('The input field background color in HSL format.'),
  ring: z.string().describe('The focus ring color in HSL format.'),
});

const GenerateThemeOutputSchema = z.object({
  light: ThemeColorsSchema.describe('The full color palette for the light theme.'),
  dark: ThemeColorsSchema.describe('The full color palette for the dark theme.'),
});

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
