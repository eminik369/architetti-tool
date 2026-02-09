export type ProjectStatus = 'attivo' | 'completato' | 'in pianificazione';
export type ProjectUrgency = 'alto' | 'medio' | 'basso';
export type BillingStatus = 'aperto' | 'parz. fatturato' | 'fatturato';

export interface DemoProject {
  id: string;
  name: string;
  location: string;
  volume: string;
  volumeNum: number;
  urgency: ProjectUrgency;
  status: ProjectStatus;
  billing: BillingStatus;
  description: string;
  descriptionEn: string;
  team: TeamMember[];
  documents: ProjectDocument[];
  notes: ProjectNote[];
  nextSteps: string[];
  nextStepsEn: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  roleEn: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: 'pdf' | 'dwg' | 'xlsx' | 'docx' | 'pptx';
  size: string;
  date: string;
}

export interface ProjectNote {
  id: string;
  text: string;
  textEn: string;
  author: string;
  date: string;
  done: boolean;
}

export type TenderSector =
  | 'Rigenerazione Urbana'
  | 'Restauro'
  | 'Edilizia Scolastica'
  | 'Riuso Industriale'
  | 'Spazi Pubblici'
  | 'Museale'
  | 'Residenziale'
  | 'Infrastrutture'
  | 'Trasporti';

export type TenderRecommendation = 'GO' | 'NO-GO' | 'VALUTARE';

export interface CriteriaScores {
  capabilityFit: number;
  timelineFit: number;
  feePotential: number;
  strategicFit: number;
}

export interface CriteriaWeights {
  capabilityFit: number;
  timelineFit: number;
  feePotential: number;
  strategicFit: number;
}

export interface TenderRequirement {
  id: string;
  category: 'eligibilità' | 'tecnico' | 'deliverable' | 'tempistica';
  categoryEn: 'eligibility' | 'technical' | 'deliverable' | 'timeline';
  text: string;
  textEn: string;
  mandatory: boolean;
}

export interface TenderRisk {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  severity: 'alta' | 'media' | 'bassa';
  severityEn: 'high' | 'medium' | 'low';
  mitigation: string;
  mitigationEn: string;
}

export interface GeneratableContent {
  id: 'requirements_summary' | 'concept_approach' | 'resource_plan' | 'client_questions' | 'draft_response';
  labelKey: string;
  content: string;
  contentEn: string;
}

export interface DemoTender {
  id: string;
  title: string;
  titleEn: string;
  entity: string;
  entityEn: string;
  sector: TenderSector;
  sectorEn: string;
  location: string;
  volume: string;
  volumeNum: number;
  deadline: string;
  scores: CriteriaScores;
  recommendation: TenderRecommendation;
  recommendationReason: string;
  recommendationReasonEn: string;
  requirements: TenderRequirement[];
  risks: TenderRisk[];
  generatableContent: GeneratableContent[];
}

export type DemoView = 'dashboard' | 'project_detail' | 'tenders' | 'tender_detail';

export interface DemoState {
  view: DemoView;
  selectedProjectId: string | null;
  selectedTenderId: string | null;
  projectsImported: boolean;
  criteriaWeights: CriteriaWeights;
  generatedContent: Record<string, Set<string>>;
}

export type DemoAction =
  | { type: 'NAVIGATE_DASHBOARD' }
  | { type: 'NAVIGATE_TENDERS' }
  | { type: 'SELECT_PROJECT'; projectId: string }
  | { type: 'SELECT_TENDER'; tenderId: string }
  | { type: 'IMPORT_COMPLETE' }
  | { type: 'UPDATE_WEIGHTS'; weights: CriteriaWeights }
  | { type: 'GENERATE_CONTENT'; tenderId: string; contentId: string };
