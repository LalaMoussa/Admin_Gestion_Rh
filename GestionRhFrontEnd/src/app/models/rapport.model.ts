// rapport.model.ts
import { Projet } from './projet.model';
import { Technicien } from './technicien.model';

export interface Rapport {
  id: number;
  technicien: Technicien; // Un technicien unique associé au rapport
  projet: Projet; // Le projet associé au rapport
  contenu: string;
  dateCreation: string; // Utilisez le type approprié si vous utilisez Date
  etat: string;
}
