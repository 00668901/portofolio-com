'use server';
/**
 * @fileOverview A flow to dynamically adjust the portfolio layout based on user interaction and content priorities.
 *
 * - adjustPortfolioLayout - A function that handles the portfolio layout adjustment process.
 * - AdjustPortfolioLayoutInput - The input type for the adjustPortfolioLayout function.
 * - AdjustPortfolioLayoutOutput - The return type for the adjustPortfolioLayout function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustPortfolioLayoutInputSchema = z.object({
  userInteraction: z.string().describe('Description of the user interaction with the portfolio.'),
  contentPriorities: z.string().describe('Description of the content priorities based on user behavior.'),
});
export type AdjustPortfolioLayoutInput = z.infer<typeof AdjustPortfolioLayoutInputSchema>;

const AdjustPortfolioLayoutOutputSchema = z.object({
  layoutInstructions: z.string().describe('Instructions for adjusting the portfolio layout.'),
});
export type AdjustPortfolioLayoutOutput = z.infer<typeof AdjustPortfolioLayoutOutputSchema>;

export async function adjustPortfolioLayout(input: AdjustPortfolioLayoutInput): Promise<AdjustPortfolioLayoutOutput> {
  return adjustPortfolioLayoutFlow(input);
}

const adjustPortfolioLayoutPrompt = ai.definePrompt({
  name: 'adjustPortfolioLayoutPrompt',
  input: {schema: AdjustPortfolioLayoutInputSchema},
  output: {schema: AdjustPortfolioLayoutOutputSchema},
  prompt: `You are an AI assistant that helps adjust a portfolio layout based on user interaction and content priorities.

  Based on the user interaction: {{{userInteraction}}} and content priorities: {{{contentPriorities}}},
  provide instructions on how to adjust the portfolio layout to best suit the user's needs. Be as detailed as possible.
  Return the layout instructions in the layoutInstructions field.`,
});

const adjustPortfolioLayoutFlow = ai.defineFlow(
  {
    name: 'adjustPortfolioLayoutFlow',
    inputSchema: AdjustPortfolioLayoutInputSchema,
    outputSchema: AdjustPortfolioLayoutOutputSchema,
  },
  async input => {
    const {output} = await adjustPortfolioLayoutPrompt(input);
    return output!;
  }
);
