import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-tendance-employes',
  templateUrl: './tendance-employes.component.html',
  styleUrls: ['./tendance-employes.component.css']
})
export class TendanceEmployesComponent implements OnInit {

  projets = [
    { nom: 'Projet Alpha', dateDebut: new Date(), dateFin: new Date(new Date().setDate(new Date().getDate() + 10)), statut: 'En cours' },
    { nom: 'Projet Beta', dateDebut: new Date(), dateFin: new Date(new Date().setDate(new Date().getDate() + 20)), statut: 'En attente' },
    { nom: 'Projet Gamma', dateDebut: new Date(), dateFin: new Date(new Date().setDate(new Date().getDate() - 5)), statut: 'Terminé' },
    // Ajoutez d'autres projets ici
  ];

  filterProjets: string = '';
  showFilterMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
    Chart.register(...registerables);

    const ctx = document.getElementById('tendanceChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui'], // Labels en français
        datasets: [{
          label: 'Tendance des Employés',
          data: [10, 20, 15, 30, 25, 40],
          borderColor: '#003366', // Bleu foncé pour la ligne
          backgroundColor: 'rgba(0, 51, 102, 0.2)', // Bleu foncé semi-transparent pour le fond
          borderWidth: 3,
          pointBackgroundColor: '#e74c3c', // Rouge pour les points
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Tendance des Employés',
            color: '#003366', // Bleu foncé pour le titre
            font: {
              size: 22, // Taille du titre
              weight: 'bold' // Gras
            },
            padding: {
              bottom: 20 // Espacement sous le titre
            }
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#333',
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            backgroundColor: '#003366',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#e74c3c',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mois',
              color: '#333',
              font: {
                size: 14
              }
            },
            ticks: {
              color: '#333',
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre d\'Employés',
              color: '#333',
              font: {
                size: 14
              }
            },
            ticks: {
              color: '#333',
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          }
        }
      }
    });
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  setFilter(status: string): void {
    this.filterProjets = status;
    this.showFilterMenu = false; // Fermer le menu après sélection
  }

  getStatusColor(statut: string): string {
    switch (statut) {
      case 'En cours':
        return '#ffeb3b'; // Jaune
      case 'En attente':
        return '#ff9800'; // Orange
      case 'Terminé':
        return '#8bc34a'; // Vert
      case 'Annulé':
        return '#f44336'; // Rouge
      default:
        return '#9e9e9e'; // Gris pour les statuts inconnus
    }
  }

  filterProjetList(): any[] {
    if (!this.filterProjets) {
      return this.projets;
    }

    return this.projets.filter(projet => projet.statut.toLowerCase().includes(this.filterProjets.toLowerCase()));
  }

  getDaysRemaining(dateFin: Date): number {
    const endDate = new Date(dateFin);
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  formatDaysRemaining(days: number): string {
    if (days > 0) {
      return `${days} jour(s) restant(s)`;
    } else if (days === 0) {
      return 'Aujourd\'hui';
    } else {
      return 'Terminé';
    }
  }
}
