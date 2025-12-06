"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleTranslateWebsite } from "@/app/actions";
import type { PageContent } from "@/app/page";

const languages = [
    { value: "en", label: "English" },
    { value: "id", label: "Indonesian" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
    { value: "de", label: "German" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "zh", label: "Chinese" },
    { value: "ru", label: "Russian" },
];

interface LanguageSelectorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  pageContent: PageContent;
  setPageContent: (content: PageContent) => void;
  initialContent: PageContent;
}

export default function LanguageSelector({
  isOpen,
  setIsOpen,
  pageContent,
  setPageContent,
  initialContent
}: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!selectedLanguage) {
      toast({
        variant: "destructive",
        title: "No Language Selected",
        description: "Please choose a language to translate to.",
      });
      return;
    }
    
    if (selectedLanguage === 'en') {
      setPageContent(initialContent);
      toast({
        title: "Language Reset",
        description: "The content has been reset to the original English version.",
      });
      setIsOpen(false);
      return;
    }

    setIsTranslating(true);
    toast({
      title: "Translating Website...",
      description: `AI is translating the content into ${languages.find(l => l.value === selectedLanguage)?.label}.`,
    });

    try {
      const translatedContent = await handleTranslateWebsite({
        content: initialContent,
        targetLanguage: selectedLanguage,
      });
      
      setPageContent(translatedContent as PageContent);
      
      toast({
        title: "Translation Complete!",
        description: `The website content has been translated.`,
      });
      setIsOpen(false);

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate Website</DialogTitle>
          <DialogDescription>
            Select a language and let AI translate the entire website for you.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select onValueChange={setSelectedLanguage} defaultValue={selectedLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a language..." />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isTranslating}>
            Cancel
          </Button>
          <Button onClick={handleTranslate} disabled={isTranslating}>
            {isTranslating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Translating...
              </>
            ) : (
              "Translate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
