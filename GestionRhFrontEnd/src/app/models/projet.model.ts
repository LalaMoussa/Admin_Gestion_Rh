import { Technicien } from "./technicien.model";
import { Tache } from './tache.model';
import { Evaluation } from "./evaluation.model";

export interface Projet {
  id: number;
  nom: string;
  emplacement: string;
  dateDebut: string;
  dateFin: string;
  responsable: string;
  etat: string;
  commentaire: string;
  techniciens?: Technicien[];
  taches?: Tache[];
  dateCreationRapport?: string;   // Optional field for report creation date
  contenuRapport?: string;        // Optional field for report content
  evaluations?: Evaluation[]; 
}
