import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../Service/projet-service.service';
import { Projet } from '../models/projet.model';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import fr from '@fullcalendar/core/locales/fr'; // Importation par défaut de la locale

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  projets: Projet[] = [];
  projetDetail?: Projet;
  calendarOptions: CalendarOptions = {};

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.projets = [
      {
        id: 1,
        nom: 'Projet Alpha',
        emplacement: 'Site A',
        dateDebut: '2024-08-01',
        dateFin: '2024-08-15',
        responsable: 'Jean Dupont',
        etat: 'En cours',
        commentaire: 'Ce projet est en bonne voie.',
        taches: [
          {
            nom: 'Tâche 1',
            responsable: 'Jean Dupont',
            dateDebut: '2024-08-01',
            dateFin: '2024-08-05',
            statut: 'En cours',
            commentaire: 'Première tâche en cours.'
          },
          {
            nom: 'Tâche 2',
            responsable: 'Marie Curie',
            dateDebut: '2024-08-06',
            dateFin: '2024-08-10',
            statut: 'Terminé',
            commentaire: 'Deuxième tâche terminée.'
          }
        ]
      }
    ];

    this.initializeCalendar();
  }

  initializeCalendar(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      locale: fr, // Configurer la locale en français
      events: this.projets.flatMap(projet =>
        projet.taches?.map(tache => ({
          title: `${tache.nom} (${this.calculateDuration(tache.dateDebut, tache.dateFin)} jours)`,
          start: tache.dateDebut,
          end: tache.dateFin,
          description: tache.commentaire,
          color: this.getColorByStatus(tache.statut),
          classNames: 'tache-event'
        })) || []
      ),
      eventClick: this.handleEventClick.bind(this),
      eventMouseEnter: this.handleEventMouseEnter.bind(this),
      eventMouseLeave: this.handleEventMouseLeave.bind(this)
    };
  }

  handleEventClick(arg: any): void {
    const clickedTache = this.projets.flatMap(projet => projet.taches ?? [])
      .find(tache => `${tache.nom} (${this.calculateDuration(tache.dateDebut, tache.dateFin)} jours)` === arg.event.title);
    if (clickedTache) {
      this.projetDetail = this.projets.find(projet => projet.taches?.includes(clickedTache));
    }
  }

  handleEventMouseEnter(arg: any): void {
    arg.el.style.borderColor = 'red';
    arg.el.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
  }

  handleEventMouseLeave(arg: any): void {
    arg.el.style.borderColor = '';
    arg.el.style.boxShadow = '';
  }

  getColorByStatus(statut: string): string {
    switch (statut) {
      case 'En cours':
        return '#ffeb3b'; // Jaune
      case 'Terminé':
        return '#8bc34a'; // Vert
      case 'Annulé':
        return '#f44336'; // Rouge
      case 'En attente':
        return '#ff9800'; // Orange
      default:
        return '#9e9e9e'; // Gris pour les statuts inconnus
    }
  }
  
  

  calculateDuration(dateDebut: string, dateFin: string): number {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Durée en jours
  }

  closeDetails(): void {
    this.projetDetail = undefined;
  }
}
