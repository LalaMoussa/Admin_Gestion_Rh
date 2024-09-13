// src/app/rapportpointage/rapportpointage.component.ts

import { Component, OnInit } from '@angular/core';
import { Pointage } from '../models/pointage.model';
import { PointageService } from '../Service/pointage-service.service';

@Component({
  selector: 'app-rapportpointage',
  templateUrl: './rapportpointage.component.html',
  styleUrls: ['./rapportpointage.component.css']
})
export class RapportpointageComponent implements OnInit {
  searchQuery: string = '';
  selectedRapport: Pointage | null = null;
  rapports: Pointage[] = [];
  filteredRapports: Pointage[] = [];

  constructor(private pointageService: PointageService) { }

  ngOnInit(): void {
    this.loadPointages();
  }

  loadPointages(): void {
    this.pointageService.getPointages().subscribe(
      (data: Pointage[]) => {
        this.rapports = data;
        this.filteredRapports = this.rapports;
      },
      error => {
        console.error('Erreur lors de la récupération des pointages', error);
      }
    );
  }

  filterRapports(): void {
    this.filteredRapports = this.rapports.filter(rapport => 
      (rapport.nom || '').toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  showDetails(rapport: Pointage): void {
    this.selectedRapport = this.selectedRapport === rapport ? null : rapport;
  }

  printReport(rapport: Pointage): void {
    window.print(); // Implémentez l'impression selon vos besoins
  }

  notifyReport(rapport: Pointage): void {
    // Implémentez la logique pour envoyer une notification
    alert('Notification envoyée pour ' + (rapport.nom || 'Inconnu'));
  }
}
