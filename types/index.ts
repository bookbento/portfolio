export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  type: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
}
