'use server';

/**
 * @fileOverview A simple live chat flow.
 *
 * - liveChat - A function that handles the live chat conversation.
 * - LiveChatInput - The input type for the liveChat function.
 * - LiveChatOutput - The return type for the liveChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LiveChatInputSchema = z.object({
  message: z.string().describe('The user\'s message in the chat.'),
  name: z.string().describe('The name of the portfolio owner.'),
});
export type LiveChatInput = z.infer<typeof LiveChatInputSchema>;

const LiveChatOutputSchema = z.object({
  response: z.string().describe('The AI\'s response to the user.'),
});
export type LiveChatOutput = z.infer<typeof LiveChatOutputSchema>;

export async function liveChat(input: LiveChatInput): Promise<LiveChatOutput> {
  return liveChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'liveChatPrompt',
  input: {schema: LiveChatInputSchema},
  output: {schema: LiveChatOutputSchema},
  prompt: `You are a friendly and helpful AI assistant for {{name}}, the owner of this portfolio. Your goal is to answer questions about {{name}}'s work, skills, or how to get in touch. Keep your answers concise and professional. If you don't know the answer, say that you will pass the message along to {{name}}.

User message: {{{message}}}

Your response:`,
});

const liveChatFlow = ai.defineFlow(
  {
    name: 'liveChatFlow',
    inputSchema: LiveChatInputSchema,
    outputSchema: LiveChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
