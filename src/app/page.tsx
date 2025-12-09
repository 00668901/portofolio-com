"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";

import Header from "@/components/header";
import AuthorSection from "@/components/author-section";
import CertificatesSection from "@/components/certificates-section";
import ProjectGallery from "@/components/project-gallery";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { author as initialAuthor, projects as initialProjects, certificates as initialCertificates } from "@/lib/data";
import type { WebsiteContent } from "@/lib/types";

export default function Home() {
  const initialContent: WebsiteContent = {
    author: initialAuthor,
    projects: initialProjects,
    certificates: initialCertificates,
    page: {
      heroTitle: initialAuthor.name,
      heroSubtitle: initialAuthor.title,
      viewWorkButton: "View My Work",
      about: {
        title: "About Me",
      },
      credentials: {
        title: "Credentials & Certificates",
        subtitle: "A collection of my professional qualifications and achievements.",
        cvButton: "Download CV",
        viewButton: "View Credential"
      },
      myWork: {
        title: "My Work",
        learnMoreButton: "Learn More",
      },
      contact: {
        title: "Get in Touch",
        subtitle:
          "Have a project in mind or just want to say hello? Drop me a line or find me online.",
        contactInfo: "Contact Information",
        followMe: "Follow Me",
        sendMessage: "Send a Message",
        form: {
          nameLabel: "Name",
          namePlaceholder: "Your Name",
          emailLabel: "Email",
          emailPlaceholder: "your.email@example.com",
          messageLabel: "Message",
          messagePlaceholder: "Tell me about your project or idea...",
          sendButton: "Send Message",
          sendingButton: "Sending...",
          successMessage: "Message Sent!",
          successDescription: "Thanks for reaching out! I'll get back to you soon.",
          errorMessage: "Uh oh! Something went wrong.",
          errorDescription: "Could not send your message. Please try again.",
        },
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} ${initialAuthor.name}. All rights reserved.`,
      },
    },
  };

  const [content, setContent] = useState<WebsiteContent>(initialContent);

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
          <AuthorSection author={content.author} content={content.page.about} />
        </div>
        <div id="credentials">
            <CertificatesSection certificates={content.certificates} author={content.author} content={content.page.credentials} />
        </div>
        <div id="projects">
          <ProjectGallery projects={content.projects} content={content.page.myWork} />
        </div>
        <div id="contact">
          <ContactSection content={content.page.contact} />
        </div>
      </main>
      <Footer authorName={content.author.name} content={content.page.footer} />
    </div>
  );
}