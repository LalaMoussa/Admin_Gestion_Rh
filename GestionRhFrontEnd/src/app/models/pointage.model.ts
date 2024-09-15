import { Technicien } from '../models/technicien.model';

export interface Pointage {
  id: number;
  technicienId?: number;  // Changer pour utiliser uniquement l'id
  technicien?: Technicien;  // Le technicien complet n'est pas nécessaire
  date: string;
  heureDebut: string;
  heureFin: string;
  commentaire?: string;
  heuresSupplementaires?: number;
}
