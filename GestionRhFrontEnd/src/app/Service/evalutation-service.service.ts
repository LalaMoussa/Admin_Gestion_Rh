import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evaluation } from '../models/evaluation.model'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private baseUrl: string = 'http://localhost:8080/api'; // URL de base pour l'API

  constructor(private http: HttpClient) { }

  // Méthode pour créer une évaluation
  createEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    const url = `${this.baseUrl}/evaluations`; // URL pour créer une évaluation
    return this.http.post<Evaluation>(url, evaluation);
  }

  // Méthode pour obtenir la liste de toutes les évaluations
  getEvaluations(): Observable<Evaluation[]> {
    const url = `${this.baseUrl}/evaluations`; // URL pour obtenir toutes les évaluations
    return this.http.get<Evaluation[]>(url);
  }

  // Méthode pour obtenir une évaluation par son ID
  getEvaluationById(id: number): Observable<Evaluation> {
    const url = `${this.baseUrl}/evaluations/${id}`; // URL pour obtenir une évaluation par ID
    return this.http.get<Evaluation>(url);
  }

  // Méthode pour mettre à jour une évaluation
  updateEvaluation(id: number, evaluation: Evaluation): Observable<Evaluation> {
    const url = `${this.baseUrl}/evaluations/${id}`; // URL pour mettre à jour une évaluation par ID
    return this.http.put<Evaluation>(url, evaluation);
  }

  // Méthode pour supprimer une évaluation
  deleteEvaluation(id: number): Observable<void> {
    const url = `${this.baseUrl}/evaluations/${id}`; // URL pour supprimer une évaluation par ID
    return this.http.delete<void>(url);
  }
}
