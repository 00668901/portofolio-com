import { z } from 'zod';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageHint: string;
  sourceUrl: string;
  liveUrl?: string;
}

export interface Author {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  avatarHint: string;
  skills: string[];
  contact: {
    email: string;
    phone: string;
    social: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      instagram?: string;
      facebook?: string;
    };
  };
}

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

export const GenerateThemeOutputSchema = z.object({
  light: ThemeColorsSchema.describe('The full color palette for the light theme.'),
  dark: ThemeColorsSchema.describe('The full color palette for the dark theme.'),
});

export type GenerateThemeOutput = z.infer<typeof GenerateThemeOutputSchema>;
