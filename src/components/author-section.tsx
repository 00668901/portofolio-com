"use client";

import { useState } from "react";
import Image from "next/image";
import { Wand2, Loader2 } from "lucide-react";
import type { Author } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { handleTranslateBio } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

interface AuthorSectionProps {
  author: Author;
}

export default function AuthorSection({ author }: AuthorSectionProps) {
  const [bio, setBio] = useState(author.bio);
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const onTranslateBio = async () => {
    setIsTranslating(true);
    try {
      const userLang = navigator.language;
      const result = await handleTranslateBio({
        existingBio: author.bio, // always translate from the original bio
        targetLanguage: userLang,
      });
      if (result.translatedBio) {
        setBio(result.translatedBio);
        toast({
          title: "Bio Translated!",
          description: `The bio has been translated to your language.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not translate bio. The AI returned no content.",
        });
      }
    } catch (error) {
      console.error("Failed to translate bio:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not translate bio. Please try again.",
      });
    } finally {
      setIsTranslating(false);
    }
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
              onClick={onTranslateBio}
              disabled={isTranslating}
            >
              {isTranslating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Translate Bio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
