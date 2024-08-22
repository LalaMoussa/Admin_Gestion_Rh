import { Technicien } from "./technicien.model";

export interface Projet {
    id: number; // ID optionnel si vous ne le connaissez pas encore
    nom: string;
    emplacement: string;
    dateDebut: string; // Vous pouvez utiliser 'Date' si vous manipulez des objets Date
    dateFin: string; // Vous pouvez utiliser 'Date' si vous manipulez des objets Date
    responsable: string;
    etat: string;
    commentaire: string;
    techniciens?: Technicien[]; // Liste des techniciens associés au projet
  }
  