'use server';

/**
 * @fileOverview A conversational AI flow with chat history and portfolio context.
 *
 * - liveChat - A function that handles the live chat conversation.
 * - LiveChatInput - The input type for the liveChat function.
 * - LiveChatOutput - The return type for the liveChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { author, projects } from '@/lib/data';

const MessageSchema = z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
});

const LiveChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The history of the conversation.'),
  message: z.string().describe("The user's latest message in the chat."),
  name: z.string().describe('The name of the portfolio owner.'),
  author: z.any().describe("The author's profile data."),
  projects: z.any().describe("The list of projects in the portfolio."),
});
export type LiveChatInput = z.infer<typeof LiveChatInputSchema>;

const LiveChatOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user."),
});
export type LiveChatOutput = z.infer<typeof LiveChatOutputSchema>;

export async function liveChat(input: LiveChatInput): Promise<LiveChatOutput> {
  return liveChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'liveChatPrompt',
  input: {schema: LiveChatInputSchema},
  output: {schema: LiveChatOutputSchema},
  prompt: `You are a helpful and versatile AI assistant for {{name}}, the owner of this portfolio. Your personality is friendly, professional, and engaging.

You have two main goals:
1.  Answer questions about {{name}} and their portfolio. Use the provided context about the author and their projects as your primary source of truth. If the user asks about projects, list them from the provided data.
2.  Be a general conversational AI. If the user asks something unrelated to the portfolio, answer it to the best of your ability, like a standard large language model (e.g., Google Gemini).

Always maintain your persona as {{name}}'s assistant. Do not break character. Keep your answers concise but informative.

## Portfolio Context:

### Author Information ({{name}}):
\`\`\`json
{{{json author}}}
\`\`\`

### Projects:
\`\`\`json
{{{json projects}}}
\`\`\`

## Conversation History:
{{#each history}}
- {{#if (eq role 'user')}}User{{else}}Assistant{{/if}}: {{{content}}}
{{/each}}

## New User Message:
- User: {{{message}}}

## Your Response:
- Assistant:`,
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

import Handlebars from 'handlebars';

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context, null, 2);
});

Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
});
