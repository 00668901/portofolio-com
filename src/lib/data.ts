import type { Author, Project, Certificate } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (!image) {
        console.error(`Image with id "${id}" not found.`);
        return {
            imageUrl: "https://picsum.photos/seed/placeholder/600/400",
            imageHint: "placeholder image"
        }
    }
    return { imageUrl: image.imageUrl, imageHint: image.imageHint };
}

export const author: Author = {
    name: "Steven Kurniawan Haryanto",
    title: "Creative Full-Stack Developer & AI Enthusiast",
    bio: "A passionate developer with a knack for creating beautiful, functional, and user-centric digital experiences. With a background in both design and engineering, I specialize in bringing ideas to life from concept to deployment. I'm driven by the challenge of solving complex problems and the thrill of learning new technologies, especially in the realm of AI.",
    avatarUrl: getImage("author-avatar").imageUrl,
    avatarHint: getImage("author-avatar").imageHint,
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Python", "GenAI", "UI/UX Design", "Figma"],
    contact: {
        email: "kurniawansteven429@gmail.com",
        phone: "+62 895320061963",
        social: {
            github: "https://github.com/00668901",
            linkedin: "https://www.linkedin.com/in/steven-kurniawan-3a18442a0/",
            twitter: "https://x.com/Steken675",
            instagram: "https://www.instagram.com/stevenn_kurniawan29/",
            facebook: "https://web.facebook.com/steven.kurniawan.90260",
        },
    },
    cvUrl: "https://github.com/00668901/kumpulan-sertifikat/blob/main/CV%20Steven%20Kurniawan.pdf"
};

export const projects: Project[] = [
    {
        id: "p1",
        title: "MyGram",
        description: "A simple photo-sharing web application developed with Go (Golang) for the backend API and React for the frontend.",
        tags: ["Go", "React", "API", "Frontend"],
        imageUrl: getImage("project-1").imageUrl,
        imageHint: getImage("project-1").imageHint,
        sourceUrl: "https://github.com/00668901/kelompok-5-golang",
        liveUrl: "https://kelompok-mas-malik.vercel.app/"
    },
    {
        id: "p2",
        title: "Zenith Mobile Banking",
        description: "A sleek, modern mobile banking app focused on user experience and security. Features biometric login, transaction tracking, and AI-powered financial advice.",
        tags: ["React Native", "TypeScript", "Node.js"],
        imageUrl: getImage("project-2").imageUrl,
        imageHint: getImage("project-2").imageHint,
        sourceUrl: "https://github.com",
        liveUrl: "https://example.com"
    },
    {
        id: "p3",
        title: "Orion Design System",
        description: "A comprehensive design system built to unify product aesthetics and streamline development workflows. Includes a full suite of reusable React components.",
        tags: ["React", "Storybook", "Figma", "Design System"],
        imageUrl:getImage("project-3").imageUrl,
        imageHint: getImage("project-3").imageHint,
        sourceUrl: "https://github.com",
        liveUrl: "https://example.com"
    },
    {
        id: "p4",
        title: "E-Commerce Platform 'Aether'",
        description: "A scalable and performant e-commerce platform with a custom headless CMS, integrated payment gateways, and a personalized shopping experience.",
        tags: ["Next.js", "GraphQL", "PostgreSQL", "Stripe"],
        imageUrl: getImage("project-4").imageUrl,
        imageHint: getImage("project-4").imageHint,
        sourceUrl: "https://github.com",
        liveUrl: "https://example.com"
    },
    {
        id: "p5",
        title: "Neural Network Playground",
        description: "An educational tool that allows users to build, train, and visualize simple neural networks directly in the browser. Made with TensorFlow.js.",
        tags: ["TensorFlow.js", "TypeScript", "WebAssembly"],
        imageUrl: getImage("project-5").imageUrl,
        imageHint: getImage("project-5").imageHint,
        sourceUrl: "https://github.com",
        liveUrl: "https://example.com"
    },
    {
        id: "p6",
        title: "Creative Agency Portfolio",
        description: "A visually-rich, animated portfolio website for a creative agency, focusing on storytelling and brand identity. Built with GSAP and Next.js.",
        tags: ["Next.js", "GSAP", "Animation", "UI/UX"],
        imageUrl: getImage("project-6").imageUrl,
        imageHint:getImage("project-6").imageHint,
        sourceUrl: "https://github.com",
        liveUrl: "https://example.com"
    },
];

export const certificates: Certificate[] = [
    {
        id: "cert1",
        title: "Introduction to Information Security",
        issuer: "Cyber Army Indonesia",
        year: "2024",
        imageUrl: getImage("certificate-1").imageUrl,
        imageHint: getImage("certificate-1").imageHint,
        url: "https://github.com/00668901/kumpulan-sertifikat/blob/main/Certificate-of-Completion-Introduction-to-Information-Security.pdf"
    },
    {
        id: "cert2",
        title: "Intro to Data Analytics",
        issuer: "RevoU",
        year: "2024",
        imageUrl: getImage("certificate-2").imageUrl,
        imageHint: getImage("certificate-2").imageHint,
        url: "https://github.com/00668901/kumpulan-sertifikat/blob/main/DAMC_kurniawansteven429%40gmail.com_DAMC-091224-01-1-00272.pdf"
    },
    {
        id: "cert3",
        title: "Internship: Graphic Designer",
        issuer: "PT Kawan Kerja Indonesia",
        year: "2025",
        imageUrl: getImage("certificate-3").imageUrl,
        imageHint: getImage("certificate-3").imageHint,
        url: "https://github.com/00668901/kumpulan-sertifikat/blob/main/Sertifikat_Magang_Graphic%20Designer_Steven%20Kurniawan%20Haryanto.pdf"
    },
    {
        id: "cert4",
        title: "Webinar: Pengantar Analisis Data",
        issuer: "Growia",
        year: "2025",
        imageUrl: getImage("certificate-4").imageUrl,
        imageHint: getImage("certificate-4").imageHint,
        url: "https://github.com/00668901/kumpulan-sertifikat/blob/main/STEVEN%20KURNIAWAN%20HARYANTO_DATA%20ANALYST%20CERTIFICATE_GROWIA.pdf"
    },
    {
        id: "cert5",
        title: "Seminar: Building Competent HR",
        issuer: "Universitas Gunadarma",
        year: "2024",
        imageUrl: getImage("certificate-5").imageUrl,
        imageHint: getImage("certificate-5").imageHint,
        url: "https://github.com/00668901/kumpulan-sertifikat/blob/main/Sertifikat_Steven%20Kurniawan%20Haryanto.pdf"
    },
    {
        id: "cert6",
        title: "Webinar Certificate",
        issuer: "BEM F-PK PNJ",
        year: "2024",
        imageUrl: getImage("certificate-6").imageUrl,
        imageHint: getImage("certificate-6").imageHint,
        url: "https://github.com/00668901/kumpulan-sertifikat/blob/main/Steven%20Kurniawan%20Haryanto.png"
    }
];
