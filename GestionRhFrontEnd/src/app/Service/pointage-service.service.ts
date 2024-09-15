import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pointage } from '../models/pointage.model';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  private apiUrl = 'http://localhost:8080/api';  // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir tous les pointages
  getPointages(): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(this.apiUrl);
  }

  // Méthode pour obtenir un pointage par ID
  getPointage(id: number): Observable<Pointage> {
    return this.http.get<Pointage>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour créer un nouveau pointage
  createPointage(pointage: Pointage): Observable<Pointage> {
    return this.http.post<Pointage>(this.apiUrl, pointage);
  }

  // Méthode pour mettre à jour un pointage existant
  updatePointage(id: number, pointage: Pointage): Observable<Pointage> {
    return this.http.put<Pointage>(`${this.apiUrl}/${id}`, pointage);
  }

  // Méthode pour supprimer un pointage
  deletePointage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
