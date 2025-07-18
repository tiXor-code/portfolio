// Type definitions for projects data

export interface ProjectDetails {
  challenge: string;
  role: string;
  approach: string;
  technologies: string[];
  outcomes: string[];
  learnings: string;
  timeline: string;
  teamSize: string;
  images: string[];
  metrics: Record<string, string>;
}

export interface Project {
  id: number;
  title: string;
  company: string;
  description: string;
  impact: string;
  image: string;
  tags: string[];
  link: string;
  featured?: boolean;
  domain: string;
  details: ProjectDetails | string;
}

declare const projectsData: Project[];
export default projectsData;