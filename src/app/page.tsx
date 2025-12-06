"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";

import Header from "@/components/header";
import AuthorSection from "@/components/author-section";
import ProjectGallery from "@/components/project-gallery";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { author as initialAuthor, projects as initialProjects } from "@/lib/data";
import type { Author, Project } from "@/lib/types";

export interface PageContent {
  author: Author;
  projects: Project[];
  page: {
    heroTitle: string;
    heroSubtitle: string;
    viewWorkButton: string;
  };
}

export default function Home() {
  const initialContent: PageContent = {
    author: initialAuthor,
    projects: initialProjects,
    page: {
      heroTitle: initialAuthor.name,
      heroSubtitle: initialAuthor.title,
      viewWorkButton: "View My Work",
    },
  };

  const [content, setContent] = useState<PageContent>(initialContent);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        pageContent={content}
        setPageContent={setContent}
        initialContent={initialContent}
      />
      <main className="flex-1">
        <section className="relative flex min-h-[50vh] flex-col items-center justify-center bg-background py-20 text-center md:min-h-[60vh]">
          <div className="container px-4 md:px-6">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              {content.page.heroTitle}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {content.page.heroSubtitle}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#projects">
                  {content.page.viewWorkButton}{" "}
                  <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <div id="about">
          <AuthorSection author={content.author} />
        </div>
        <div id="projects">
          <ProjectGallery projects={content.projects} />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </main>
      <Footer authorName={content.author.name} />
    </div>
  );
}
