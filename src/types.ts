export interface Skill {
  id: string;
  name: string;
  percentage: number;
  category: 'core' | 'language' | 'tool' | 'library';
  summary: string;
  experience: string;
  relatedProjects: string[];
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  role?: string;
  problem: string;
  solution: string;
  metrics?: { label: string; value: string; trend?: string }[];
  githubUrl?: string;
  liveUrl?: string;
  docUrl?: string;
  featured?: boolean;
  dataset?: string;
  features?: string[];
  insights?: string[];
  impact?: string[];
}

export interface TimelineEvent {
  id: string;
  phase: string;
  title: string;
  duration: string;
  subtitle: string;
  description: string;
  milestones: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  badgeColor: string;
  glowColor: string;
  date: string;
  credentialUrl?: string;
}
