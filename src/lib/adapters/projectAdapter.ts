import type { LegacyProject } from '../../data/projects';

export type ProjectCardProps = {
  title: string;
  summary: string;
  stacks: string; // comma separated
  cover: string;
  links: { demo?: string; repo?: string };
  badges?: string[];
  slug?: string;
  category?: 'AI' | 'Front' | 'Back' | 'DevOps' | 'Fullstack';
  period?: string;
  teamSize?: number;
  myRole?: string[];
  organization?: string;
};

export function adaptToProjectCard(p: LegacyProject): ProjectCardProps {
  return {
    title: p.title,
    summary: p.summary || p.description,
    stacks: p.tech?.join(', ') ?? '',
    cover: p.image,
    links: { demo: p.links?.demo, repo: p.links?.github },
    badges: p.tags || p.features?.slice(0, 3),
    slug: p.slug,
    category: (p.category as ProjectCardProps['category']) || 'Fullstack',
    period: p.period,
    teamSize: p.teamSize,
    myRole: p.myRole,
    organization: p.organization,
  };
}

export function adaptList(projects: LegacyProject[]): ProjectCardProps[] {
  return projects.map(adaptToProjectCard);
}
