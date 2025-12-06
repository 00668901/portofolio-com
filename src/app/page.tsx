"use client";

import { useState, useMemo } from "react";
import { ArrowDown, Wand2 } from "lucide-react";

import Header from "@/components/header";
import AuthorSection from "@/components/author-section";
import ProjectGallery from "@/components/project-gallery";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { handleLayoutAdjustment } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { author, projects } from "@/lib/data";

type SectionKey = "about" | "projects" | "contact";

export default function Home() {
  const [layoutOrder, setLayoutOrder] = useState<SectionKey[]>([
    "about",
    "projects",
    "contact",
  ]);
  const [isAdjustingLayout, setIsAdjustingLayout] = useState(false);
  const { toast } = useToast();

  const adjustLayout = async () => {
    setIsAdjustingLayout(true);
    try {
      const result = await handleLayoutAdjustment({
        userInteraction: "User clicked the 'Adjust Layout' button.",
        contentPriorities: "Prioritize showcasing projects and skills.",
      });
      
      const newOrder = result.layoutInstructions
        .split(",")
        .map((s) => s.trim())
        .filter((s): s is SectionKey => ["about", "projects", "contact"].includes(s));

      if (newOrder.length === 3) {
        setLayoutOrder(newOrder);
        toast({
          title: "Layout Adjusted!",
          description: "The portfolio layout has been optimized by AI.",
        });
      } else {
        throw new Error("AI returned an invalid layout format.");
      }
    } catch (error) {
      console.error("Failed to adjust layout:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not adjust layout. Please try again.",
      });
    } finally {
      setIsAdjustingLayout(false);
    }
  };

  const sections: Record<SectionKey, React.ReactNode> = useMemo(
    () => ({
      about: <AuthorSection author={author} />,
      projects: <ProjectGallery projects={projects} />,
      contact: <ContactSection />,
    }),
    []
  );

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
              <Button size="lg" variant="secondary" onClick={adjustLayout} disabled={isAdjustingLayout}>
                <Wand2 className="mr-2 h-4 w-4" />
                {isAdjustingLayout ? "Optimizing..." : "Let AI Adjust Layout"}
              </Button>
            </div>
          </div>
        </section>
        
        {layoutOrder.map((key) => (
          <div id={key} key={key}>
            {sections[key]}
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
