export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageHint: string;
  sourceUrl: string;
  liveUrl?: string;
}

export interface Author {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  avatarHint: string;
  skills: string[];
  contact: {
    email: string;
    phone: string;
    social: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      instagram?: string;
      facebook?: string;
    };
  };
}