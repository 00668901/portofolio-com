'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-alternative-project-descriptions.ts';
import '@/ai/flows/live-chat-flow.ts';
import '@/ai/flows/generate-ui-theme.ts';
import '@/ai/flows/translate-website.ts';
