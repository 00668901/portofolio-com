"use client";

import { Code2, Wand2, Moon, Sun } from "lucide-react";

export default function Header() {
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
        </nav>
      </div>
    </header>
  );
}
