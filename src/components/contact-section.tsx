"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Send, Mail, Phone, Github, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { handleContactSubmit } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { author } from "@/lib/data";
import type { WebsiteContent, ContactFormSchema } from "@/lib/types";

interface ContactSectionProps {
  content: WebsiteContent['page']['contact'];
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});


export default function ContactSection({ content }: ContactSectionProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await handleContactSubmit(values);
    if (result.success) {
      toast({
        title: content.form.successMessage,
        description: content.form.successDescription,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: content.form.errorMessage,
        description: result.message || content.form.errorDescription,
      });
    }
  }

  return (
    <section className="py-12 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{content.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{content.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2 space-y-8">
                <div>
                    <h3 className="font-headline text-2xl font-bold mb-4">{content.contactInfo}</h3>
                    <div className="space-y-4 text-lg">
                        <a href={`mailto:${author.contact.email}`} className="flex items-center gap-4 group">
                            <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">{author.contact.email}</span>
                        </a>
                        <a href={`tel:${author.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 group">
                            <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">{author.contact.phone}</span>
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="font-headline text-2xl font-bold mb-4">{content.followMe}</h3>
                     <div className="flex items-center gap-2">
                        {author.contact.social.github && (
                            <Button variant="outline" size="icon" asChild>
                                <a href={author.contact.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                    <Github className="h-5 w-5" />
                                </a>
                            </Button>
                        )}
                        {author.contact.social.linkedin && (
                            <Button variant="outline" size="icon" asChild>
                                <a href={author.contact.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </Button>
                        )}
                        {author.contact.social.twitter && (
                            <Button variant="outline" size="icon" asChild>
                                <a href={author.contact.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                    <Twitter className="h-5 w-5" />
                                </a>
                            </Button>
                        )}
                        {author.contact.social.instagram && (
                            <Button variant="outline" size="icon" asChild>
                                <a href={author.contact.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </Button>
                        )}
                        {author.contact.social.facebook && (
                            <Button variant="outline" size="icon" asChild>
                                <a href={author.contact.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <Facebook className="h-5 w-5" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="md:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>{content.sendMessage}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>{content.form.nameLabel}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={content.form.namePlaceholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>{content.form.emailLabel}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={content.form.emailPlaceholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                            </div>
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>{content.form.messageLabel}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder={content.form.messagePlaceholder}
                                        className="min-h-[120px]"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <div className="text-right">
                                <Button type="submit" size="lg" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {content.form.sendingButton}
                                        </>
                                    ) : (
                                        <>
                                            {content.form.sendButton}
                                            <Send className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
