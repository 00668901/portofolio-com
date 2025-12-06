import { Github, Linkedin, Twitter } from "lucide-react";
import { author } from "@/lib/data";
import { Button } from "./ui/button";

export default function Footer() {
    return (
      <footer className="border-t">
        <div className="container flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {author.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
                <a href={author.contact.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <a href={author.contact.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <a href={author.contact.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                </a>
            </Button>
          </div>
        </div>
      </footer>
    );
  }
