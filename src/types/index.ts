import { type LucideIcon } from "lucide-react";

export interface Solution {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  stats: SolutionStat[];
  subSections: SubSection[];
  color: string;
}

export interface SolutionStat {
  value: string;
  labelKey: string;
}

export interface SubSection {
  id: string;
  statValue: string;
  statLabelKey: string;
  titleKey: string;
  descriptionKey: string;
  bullets: string[];
  highlightKey: string;
  scenarioKey: string;
  results: ResultMetric[];
  demoComponent: string;
}

export interface ResultMetric {
  labelKey: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  client: string;
  typology: string;
  status: string;
  surfaceM2: number | null;
  tags: string[];
}

export interface Step {
  number: string;
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
}
