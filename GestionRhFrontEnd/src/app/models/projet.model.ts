import { Technicien } from "./technicien.model";
import { Tache } from './tache.model';

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
  taches?: Tache[]; // Utilisez le modèle Tache ici
}
