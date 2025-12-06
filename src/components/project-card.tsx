"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Wand2, Loader2, Sparkles } from "lucide-react";
import type { Project } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { handleGenerateDescription } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project: initialProject }: ProjectCardProps) {
  const [project, setProject] = useState(initialProject);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();

  const onGenerateDescription = async () => {
    setIsGenerating(true);
    try {
      const result = await handleGenerateDescription({
        projectName: project.title,
        originalDescription: project.description,
      });

      if (result.alternativeDescription) {
        setProject({ ...project, description: result.alternativeDescription });
        toast({
          title: "Description Updated!",
          description: (
            <div className="flex items-start">
              <Sparkles className="h-4 w-4 mr-2 mt-1 text-primary" />
              <span>AI has generated a new description for your project.</span>
            </div>
          ),
        });
      } else {
        throw new Error("AI returned no content.");
      }
    } catch (error) {
      console.error("Failed to generate description:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate new description.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <TooltipProvider>
      <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="relative">
          <div className="aspect-[3/2] relative w-full overflow-hidden rounded-t-lg">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={project.imageHint}
            />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-5 right-5 h-8 w-8 bg-background/70 backdrop-blur-sm"
                onClick={onGenerateDescription}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate new description with AI</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
        <CardContent className="flex-1">
          <CardTitle className="font-headline text-xl mb-2">{project.title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {project.description}
          </CardDescription>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label="View source code">
                  <Github className="h-5 w-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent><p>Source Code</p></TooltipContent>
            </Tooltip>
            {project.liveUrl && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setIsPreviewOpen(true)} aria-label="View live demo">
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>Interactive Preview</p></TooltipContent>
              </Tooltip>
            )}
          </div>
          <Button onClick={() => setIsPreviewOpen(true)}>Learn More</Button>
        </CardFooter>
      </Card>
      
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">{project.title}</DialogTitle>
            <DialogDescription>{project.description}</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <div className="aspect-video relative w-full overflow-hidden rounded-lg border">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={project.imageHint}
                />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                    {tag}
                </Badge>
                ))}
            </div>
          </div>
          <DialogFooter>
             <Button variant="secondary" asChild>
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                </a>
            </Button>
            {project.liveUrl && (
                <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live Site
                    </a>
                </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
