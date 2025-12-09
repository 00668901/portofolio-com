"use client";

import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";

import type { Certificate, WebsiteContent, Author } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CertificatesSectionProps {
  certificates: Certificate[];
  author: Author;
  content: WebsiteContent["page"]["credentials"];
}

export default function CertificatesSection({
  certificates,
  author,
  content,
}: CertificatesSectionProps) {
  return (
    <section className="bg-card py-12 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div className="text-left">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              {content.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl">{content.subtitle}</p>
          </div>
          <Button size="lg" asChild>
            <a href={author.cvUrl} download>
              {content.cvButton}
              <Download className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} content={content} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CertificateCardProps {
  certificate: Certificate;
  content: WebsiteContent["page"]["credentials"];
}

function CertificateCard({ certificate, content }: CertificateCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-pointer">
          <div className="relative">
            <div className="aspect-[3/2] relative w-full overflow-hidden rounded-t-lg">
              <Image
                src={certificate.imageUrl}
                alt={certificate.title}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={certificate.imageHint}
              />
            </div>
          </div>
          <CardHeader>
            <h3 className="font-bold text-lg">{certificate.title}</h3>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              {certificate.issuer} &bull; {certificate.year}
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            {certificate.title}
          </DialogTitle>
        </DialogHeader>
        <div className="my-4">
          <div className="aspect-video relative w-full overflow-hidden rounded-lg border">
            <Image
              src={certificate.imageUrl}
              alt={certificate.title}
              fill
              style={{ objectFit: 'contain' }}
              data-ai-hint={certificate.imageHint}
            />
          </div>
          <p className="text-center text-muted-foreground mt-2">
            Issued by {certificate.issuer} in {certificate.year}
          </p>
        </div>
        {certificate.url && (
          <DialogFooter>
            <Button asChild>
              <a href={certificate.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                {content.viewButton}
              </a>
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
