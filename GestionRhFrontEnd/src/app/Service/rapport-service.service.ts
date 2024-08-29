import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rapport } from '../models/rapport.model';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  private baseUrl: string = 'http://localhost:8080/api'; // Assurez-vous que cette URL correspond à votre API backend

  constructor(private http: HttpClient) { }

  createRapport(rapport: Rapport): Observable<Rapport> {
    const url = `${this.baseUrl}/rapports`;
    return this.http.post<Rapport>(url, rapport);
  }

  getRapports(): Observable<Rapport[]> {
    const url = `${this.baseUrl}/rapports`;
    return this.http.get<Rapport[]>(url);
  }

  getRapportById(id: number): Observable<Rapport> {
    const url = `${this.baseUrl}/rapports/${id}`;
    return this.http.get<Rapport>(url);
  }

  updateRapport(id: number, rapport: Rapport): Observable<Rapport> {
    const url = `${this.baseUrl}/rapports/${id}`;
    return this.http.put<Rapport>(url, rapport);
  }

  deleteRapport(id: number): Observable<void> {
    const url = `${this.baseUrl}/rapports/${id}`;
    return this.http.delete<void>(url);
  }

  sendNotification(technicienId: number): Observable<void> {
    const url = `${this.baseUrl}/notifications/${technicienId}`;
    return this.http.post<void>(url, {});
  }
}
