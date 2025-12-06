"use client";

import { Code2, Moon, Sun, Wand2 } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "./ui/button";

export default function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const setRandomTheme = () => {
    const randomTheme = Math.random() > 0.5 ? "dark" : "light";
    setTheme(randomTheme);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <a href="#" className="mr-6 flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">Persona Portfolio</span>
        </a>
        <nav className="flex items-center gap-2 text-sm ml-auto">
          <a
            href="#projects"
            className="transition-colors hover:text-foreground/80 text-foreground/60 px-2"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-foreground/80 text-foreground/60 px-2"
          >
            Contact
          </a>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
           <Button variant="ghost" size="icon" onClick={setRandomTheme}>
            <Wand2 className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Let AI choose theme</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
