"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { GenerateThemeOutput } from "@/ai/flows/generate-ui-theme";

type Theme = "dark" | "light"

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  palette: GenerateThemeOutput | null
  setPalette: (palette: GenerateThemeOutput) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  palette: null,
  setPalette: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Function to apply theme colors as CSS variables to an element
const applyTheme = (theme: Theme, palette: GenerateThemeOutput, element: HTMLElement) => {
    const themeColors = palette[theme];
    Object.entries(themeColors).forEach(([key, value]) => {
      const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      element.style.setProperty(cssVarName, value);
    });
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [palette, setPaletteState] = useState<GenerateThemeOutput | null>(null);

  useEffect(() => {
    // On mount, try to get theme and palette from localStorage
    try {
        const storedTheme = localStorage.getItem("theme") as Theme | null;
        const storedPalette = localStorage.getItem("palette");

        if (storedTheme) {
            setThemeState(storedTheme);
        }

        if (storedPalette) {
            const parsedPalette = JSON.parse(storedPalette) as GenerateThemeOutput;
            setPaletteState(parsedPalette);
        }
    } catch (error) {
        console.error("Could not access localStorage for theme:", error);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Apply class for dark/light mode
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Apply dynamic palette colors
    if (palette) {
        applyTheme(theme, palette, body);
        
        // Store current settings in localStorage
        try {
            localStorage.setItem("theme", theme);
            localStorage.setItem("palette", JSON.stringify(palette));
        } catch (error) {
             console.error("Could not access localStorage for theme:", error);
        }
    }
  }, [theme, palette]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const setPalette = useCallback((newPalette: GenerateThemeOutput) => {
    setPaletteState(newPalette);
  }, []);

  const value = {
    theme,
    setTheme,
    palette,
    setPalette,
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
