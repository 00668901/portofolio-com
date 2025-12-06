import type { Author, Project } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (!image) {
        return {
            imageUrl: "https://picsum.photos/seed/placeholder/600/400",
            imageHint: "placeholder image"
        }
    }
    return { imageUrl: image.imageUrl, imageHint: image.imageHint };
}

export const author: Author = {
    name: "Alex Doe",
    title: "Creative Full-Stack Developer & AI Enthusiast",
    bio: "A passionate developer with a knack for creating beautiful, functional, and user-centric digital experiences. With a background in both design and engineering, I specialize in bringing ideas to life from concept to deployment. I'm driven by the challenge of solving complex problems and the thrill of learning new technologies, especially in the realm of AI.",
    avatarUrl: getImage("author-avatar").imageUrl,
    avatarHint: getImage("author-avatar").imageHint,
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Python", "GenAI", "UI/UX Design", "Figma"],
    contact: {
        email: "alex.doe@example.com",
        phone: "+1 (555) 123-4567",
        social: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com",
            facebook: "https://facebook.com",
        },
    }
};

export const projects: Project[] = [
    {
        id: "p1",
        title: "AI-Powered Data Visualizer",
        description: "An interactive web application that uses machine learning to generate insightful visualizations from complex datasets. Built with D3.js and a Python backend.",
        tags: ["React", "Python", "D3.js", "AI/ML"],
        imageUrl: getImage("project-1").imageUrl,
        imageHint: getImage("project-1").imageHint,
        sourceUrl: "https://github.com",
        liveUrl: "#"
    },
    {
        id: "p2",
        title: "Zenith Mobile Banking",
        description: "A sleek, modern mobile banking app focused on user experience and security. Features biometric login, transaction tracking, and AI-powered financial advice.",
        tags: ["React Native", "TypeScript", "Node.js"],
        imageUrl: getImage("project-2").imageUrl,
        imageHint: getImage("project-2").imageHint,
        sourceUrl: "https://github.com",
        liveUrl: "#"
    },
    {
        id: "p3",
        title: "Orion Design System",
        description: "A comprehensive design system built to unify product aesthetics and streamline development workflows. Includes a full suite of reusable React components.",
        tags: ["React", "Storybook", "Figma", "Design System"],
        imageUrl:getImage("project-3").imageUrl,
        imageHint: getImage("project-3").imageHint,
        sourceUrl: "https://github.com",
    },
    {
        id: "p4",
        title: "E-Commerce Platform 'Aether'",
        description: "A scalable and performant e-commerce platform with a custom headless CMS, integrated payment gateways, and a personalized shopping experience.",
        tags: ["Next.js", "GraphQL", "PostgreSQL", "Stripe"],
        imageUrl: getImage("project-4").imageUrl,
        imageHint: getImage("project-4").imageHint,
        sourceUrl: "https://github.com",
        liveUrl: "#"
    },
    {
        id: "p5",
        title: "Neural Network Playground",
        description: "An educational tool that allows users to build, train, and visualize simple neural networks directly in the browser. Made with TensorFlow.js.",
        tags: ["TensorFlow.js", "TypeScript", "WebAssembly"],
        imageUrl: getImage("project-5").imageUrl,
        imageHint: getImage("project-5").imageHint,
        sourceUrl: "https://github.com",
    },
    {
        id: "p6",
        title: "Creative Agency Portfolio",
        description: "A visually-rich, animated portfolio website for a creative agency, focusing on storytelling and brand identity. Built with GSAP and Next.js.",
        tags: ["Next.js", "GSAP", "Animation", "UI/UX"],
        imageUrl: getImage("project-6").imageUrl,
        imageHint:getImage("project-6").imageHint,
        sourceUrl: "https://github.com",
        liveUrl: "#"
    },
];