"use client";

import { useState } from "react";
import Image from "next/image";
import { Wand2, Loader2, Check } from "lucide-react";
import type { Author } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { handleGenerateBio } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

interface AuthorSectionProps {
  author: Author;
}

export default function AuthorSection({ author }: AuthorSectionProps) {
  const [bio, setBio] = useState(author.bio);
  const [isGenerating, setIsGenerating] = useState(false);
  const [bioOptions, setBioOptions] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const onGenerateBio = async () => {
    setIsGenerating(true);
    try {
      const userLang = navigator.language;
      const result = await handleGenerateBio({
        existingBio: bio,
        numberOfOptions: 3,
        targetLanguage: userLang,
      });
      if (result.bios && result.bios.length > 0) {
        setBioOptions(result.bios);
        setIsDialogOpen(true);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not generate bio options. The AI returned no content.",
        });
      }
    } catch (error) {
      console.error("Failed to generate bio:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate bio options. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const selectBio = (selectedBio: string) => {
    setBio(selectedBio);
    setIsDialogOpen(false);
    toast({
        title: "Success!",
        description: "Author bio has been updated.",
    })
  };

  return (
    <section className="bg-card py-12 md:py-24">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg mb-4">
            <Image
              src={author.avatarUrl}
              alt={author.name}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={author.avatarHint}
            />
          </div>
          <h2 className="font-headline text-3xl font-bold">{author.name}</h2>
          <p className="text-primary">{author.title}</p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
            {author.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="font-headline text-2xl font-bold mb-4">About Me</h3>
          <div className="relative">
            <p className="text-muted-foreground text-lg leading-relaxed">{bio}</p>
            <Button
              size="sm"
              variant="outline"
              className="absolute -top-4 -right-2"
              onClick={onGenerateBio}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Bio
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Choose a New Bio</DialogTitle>
            <DialogDescription>
              Select one of the AI-generated bios below to update your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {bioOptions.map((option, index) => (
              <Card key={index} className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex items-start gap-4">
                  <p className="flex-1 text-sm text-foreground">{option}</p>
                  <Button variant="ghost" size="icon" onClick={() => selectBio(option)}>
                    <Check className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
