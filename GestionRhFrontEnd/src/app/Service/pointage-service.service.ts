import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pointage } from '../models/pointage.model';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  private baseUrl: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  createPointage(pointage: Pointage): Observable<Pointage> {
    const url = `${this.baseUrl}/pointages`;
    return this.http.post<Pointage>(url, pointage);
  }

  getPointages(): Observable<Pointage[]> {
    const url = `${this.baseUrl}/pointages`;
    return this.http.get<Pointage[]>(url);
  }

  getPointageById(id: number): Observable<Pointage> {
    const url = `${this.baseUrl}/pointages/${id}`;
    return this.http.get<Pointage>(url);
  }

  updatePointage(id: number, pointage: Pointage): Observable<Pointage> {
    const url = `${this.baseUrl}/pointages/${id}`;
    return this.http.put<Pointage>(url, pointage);
  }

  deletePointage(id: number): Observable<void> {
    const url = `${this.baseUrl}/pointages/${id}`;
    return this.http.delete<void>(url);
  }
}
