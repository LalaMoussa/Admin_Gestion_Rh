import { Projet } from "./projet.model";
import { Technicien } from "./technicien.model";

export interface Evaluation {
    id: number;
    qualite: string;
    delai: string;
    cooperation: string;
    commentaire: string;
    scoreTotal: number;
    dateEvaluation?: Date;
    note?: number;
    projet?: Projet[];
    technicien?: Technicien[];
  
  }
  