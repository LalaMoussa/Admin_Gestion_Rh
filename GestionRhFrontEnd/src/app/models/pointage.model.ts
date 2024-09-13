// src/app/models/pointage.model.ts

import { Technicien } from '../models/technicien.model';

export interface Pointage {
  id: number;
  technicien: Technicien | null;
  date: string;
  heureDebut: string;
  heureFin: string;
  commentaire?: string;
  nom?: string; // Nom est optionnel
}
