import {Rapport} from "./rapport.model"

export interface Evaluation {
    id: number;
    rapport?: Rapport[];
    qualite: string;
    delai: string;
    cooperation: string;
    commentaire: string;
    scoreTotal: number;
    dateEvaluation?: Date;
    note?: number;
  
  }
  