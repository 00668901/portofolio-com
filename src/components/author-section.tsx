"use client";

import Image from "next/image";
import type { Author } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface AuthorSectionProps {
  author: Author;
  content: {
    title: string;
  };
}

export default function AuthorSection({ author, content }: AuthorSectionProps) {
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
          <h3 className="font-headline text-2xl font-bold mb-4">{content.title}</h3>
          <div className="relative">
            <p className="text-muted-foreground text-lg leading-relaxed">{author.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
