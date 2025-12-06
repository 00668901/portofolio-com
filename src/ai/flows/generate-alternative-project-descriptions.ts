'use server';

/**
 * @fileOverview Generates alternative project descriptions using AI.
 *
 * - generateAlternativeProjectDescriptions - A function that generates alternative project descriptions.
 * - GenerateAlternativeProjectDescriptionsInput - The input type for the generateAlternativeProjectDescriptions function.
 * - GenerateAlternativeProjectDescriptionsOutput - The return type for the generateAlternativeProjectDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAlternativeProjectDescriptionsInputSchema = z.object({
  originalDescription: z.string().describe('The original project description.'),
  projectName: z.string().describe('The name of the project.'),
});
export type GenerateAlternativeProjectDescriptionsInput =
  z.infer<typeof GenerateAlternativeProjectDescriptionsInputSchema>;

const GenerateAlternativeProjectDescriptionsOutputSchema = z.object({
  alternativeDescription: z
    .string()
    .describe('The AI-generated alternative project description.'),
});
export type GenerateAlternativeProjectDescriptionsOutput =
  z.infer<typeof GenerateAlternativeProjectDescriptionsOutputSchema>;

export async function generateAlternativeProjectDescriptions(
  input: GenerateAlternativeProjectDescriptionsInput
): Promise<GenerateAlternativeProjectDescriptionsOutput> {
  return generateAlternativeProjectDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAlternativeProjectDescriptionsPrompt',
  input: {schema: GenerateAlternativeProjectDescriptionsInputSchema},
  output: {schema: GenerateAlternativeProjectDescriptionsOutputSchema},
  prompt: `You are a creative copywriter who specializes in writing compelling project descriptions for portfolios. Generate an alternative description for the following project, making it engaging and highlighting its key features and benefits.

Project Name: {{{projectName}}}
Original Description: {{{originalDescription}}}

Alternative Description:`,
});

const generateAlternativeProjectDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateAlternativeProjectDescriptionsFlow',
    inputSchema: GenerateAlternativeProjectDescriptionsInputSchema,
    outputSchema: GenerateAlternativeProjectDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
