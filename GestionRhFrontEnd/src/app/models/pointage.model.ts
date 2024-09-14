// src/app/models/pointage.model.ts

export interface Pointage {
    id: number;
    nom: string;
    date: string;
    heureDebut: string;
    heureFin: string;
    commentaire?: string;
    heuresSupplementaires?: number; // Champ pour les heures supplémentaires
}
