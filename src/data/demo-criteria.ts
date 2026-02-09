import type { CriteriaWeights } from '@/types/demo';

export const defaultWeights: CriteriaWeights = {
  capabilityFit: 0.35,
  timelineFit: 0.20,
  feePotential: 0.25,
  strategicFit: 0.20,
};

export const criteriaLabels = {
  capabilityFit: {
    it: 'Capability Fit',
    en: 'Capability Fit',
    descIt: 'Corrispondenza competenze studio-bando',
    descEn: 'Alignment between practice expertise and tender requirements',
  },
  timelineFit: {
    it: 'Timeline Fit',
    en: 'Timeline Fit',
    descIt: 'Fattibilità temporale rispetto al carico attuale',
    descEn: 'Schedule feasibility relative to current workload',
  },
  feePotential: {
    it: 'Fee Potential',
    en: 'Fee Potential',
    descIt: 'Potenziale economico del bando',
    descEn: 'Financial potential of the tender',
  },
  strategicFit: {
    it: 'Strategic Fit',
    en: 'Strategic Fit',
    descIt: 'Allineamento con la strategia dello studio',
    descEn: 'Alignment with practice strategy',
  },
} as const;

export function computeWeightedScore(
  scores: { capabilityFit: number; timelineFit: number; feePotential: number; strategicFit: number },
  weights: CriteriaWeights
): number {
  const total =
    scores.capabilityFit * weights.capabilityFit +
    scores.timelineFit * weights.timelineFit +
    scores.feePotential * weights.feePotential +
    scores.strategicFit * weights.strategicFit;
  const sumWeights =
    weights.capabilityFit + weights.timelineFit + weights.feePotential + weights.strategicFit;
  return Math.round((total / sumWeights) * 10) / 10;
}
