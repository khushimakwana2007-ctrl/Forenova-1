
export interface UserSession {
  username: string;
  isLoggedIn: boolean;
  progress: number;
  quizScores: number[];
  joinedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'MCQ' | 'TF' | 'IMAGE';
  imageUrl?: string;
}

export interface EvidenceType {
  id: string;
  name: string;
  category: string;
  toolsNeeded: string[];
  packaging: string;
  storage: string;
  temperature: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  techniquesUsed: string[];
  outcome: string;
  findings: string[];
  color: string;
  subtext: string;
  sourceUrl?: string; // Link for reading more about real historical cases
  relatedCaseIds?: string[];
}

export interface CaseSimulation {
  id: string;
  title: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  briefing: string;
  location: string;
  externalReference?: string; // Link for external reading/manual for the simulation
  victimInfo: {
    name: string;
    age: string;
    occupation: string;
    status: string;
    estimatedTime: string;
  };
  clues: {
    id: string;
    name: string;
    description: string;
    requiredTool: string;
    labDivision: string;
    found: boolean;
    scientificReasoning: string;
  }[];
  suspects: {
    id: string;
    name: string;
    role: string;
    motive: string;
    isGuilty: boolean;
    evidenceLink: string;
  }[];
  walkthroughSteps: string[];
}

export interface LabEquipment {
  name: string;
  description: string;
  useCase: string;
}

export interface LabProcedure {
  step: number;
  title: string;
  action: string;
}

export interface LabDivision {
  id: string;
  name: string;
  description: string;
  subFields: string[];
  color: string;
  equipment: LabEquipment[];
  procedure: LabProcedure[];
  quiz: QuizQuestion[];
}

export type TabType = 'home' | 'evidence' | 'sketch' | 'lab' | 'library' | 'exams' | 'profile' | 'expert' | 'cases';

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface PathPoint {
  x: number;
  y: number;
}

export interface SceneObject {
  id: string;
  type: 'Marker' | 'Wall' | 'Furniture' | 'Path' | 'Label';
  subType: string;
  label: string;
  x: number;
  y: number;
  width: number;
  depth: number;
  rotation: number;
  color: string;
  points?: PathPoint[];
  evidenceId?: string;
}

export interface RoomDimensions {
  width: number;
  length: number;
}
