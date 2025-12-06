"use client";

import { useState, useMemo } from "react";
import { ArrowDown, Languages } from "lucide-react";

import Header from "@/components/header";
import AuthorSection from "@/components/author-section";
import ProjectGallery from "@/components/project-gallery";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { author as initialAuthor, projects as initialProjects } from "@/lib/data";

export default function Home() {
  const [author, setAuthor] = useState(initialAuthor);
  const [projects, setProjects] = useState(initialProjects);
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const handleTranslatePage = async () => {
    setIsTranslating(true);
    toast({
      title: "Translating Website...",
      description: "AI is translating the content into your language.",
    });
    // In a real implementation, you would create a new AI flow 
    // to translate all page content and update the state.
    // For this demonstration, we'll simulate a delay.
    try {
      // Fake translation logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // This is where you would call your new AI flow
      // const translatedContent = await handleTranslateWebsite({
      //   author, 
      //   projects,
      //   targetLanguage: navigator.language
      // });
      // setAuthor(translatedContent.author);
      // setProjects(translatedContent.projects);

      toast({
        title: "Translation Complete!",
        description: "The website content has been translated.",
      });

    } catch (error) {
       console.error("Failed to translate website:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not translate the website. Please try again.",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative flex min-h-[50vh] flex-col items-center justify-center bg-background py-20 text-center md:min-h-[60vh]">
          <div className="container px-4 md:px-6">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              {author.name}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {author.title}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#projects">
                  View My Work <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="secondary" onClick={handleTranslatePage} disabled={isTranslating}>
                <Languages className="mr-2 h-4 w-4" />
                {isTranslating ? "Translating..." : "Translate with AI"}
              </Button>
            </div>
          </div>
        </section>
        
        <div id="about">
          <AuthorSection author={author} />
        </div>
        <div id="projects">
          <ProjectGallery projects={projects} />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
