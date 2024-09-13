import { Projet } from "./projet.model";
import { Technicien } from "../models/technicien.model";

export interface Evaluation {
    id: number;
    qualite: string;
    delai: string;
    cooperation: string;
    commentaire: string;
    scoreTotal: number;
    dateEvaluation?: Date;
    formation: string;
    technicien?: Technicien; // Modifié ici pour correspondre au type attendu
}
