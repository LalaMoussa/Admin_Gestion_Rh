import { Technicien } from '../models/technicien.model';

export interface Pointage {
  id: number; 
  technicienId?: number; 
  technicien: Technicien | null; 
  date: string; 
  heureDebut: string; 
  heureFin: string; 
  commentaire?: string; 
  heuresSupplementaires?: number; 
}
