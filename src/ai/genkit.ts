import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import Handlebars from 'handlebars';

// Register Handlebars helpers globally for all prompts
Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context, null, 2);
});

Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
});

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
