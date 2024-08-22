import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../Service/projet-service.service'; // Assurez-vous que le chemin est correct
import { Projet } from '../models/projet.model'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})


export class ProjetComponent implements OnInit {
  projet: Projet = {
    id: 0,
    nom: '',
    emplacement: '',
    dateDebut: '',
    dateFin: '',
    responsable: '',
    etat: 'En cours',
    commentaire: ''
  };

  projets: Projet[] = [];

  constructor(private projetService: ProjetService) { }

  ngOnInit(): void {
    this.getProjets(); // Récupérer les projets au chargement du composant
  }

  onSubmit(): void {
    if (this.projet.id === 0) {
      // Création d'un nouveau projet
      this.projetService.createProjet(this.projet).subscribe(
        (response: Projet) => {
          console.log('Projet créé avec succès:', response);
          this.projets.push(response); // Ajoutez le projet créé à la liste
          this.resetForm(); // Réinitialisez le formulaire après soumission
        },
        (error) => {
          console.error('Erreur lors de la création du projet:', error);
        }
      );
    } else {
      // Mise à jour d'un projet existant
      this.projetService.updateProjet(this.projet.id, this.projet).subscribe(
        (response: Projet) => {
          console.log('Projet mis à jour avec succès:', response);
          // Mettez à jour le projet dans la liste des projets
          this.projets = this.projets.map(p => p.id === response.id ? response : p);
          this.resetForm(); // Réinitialisez le formulaire après soumission
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du projet:', error);
        }
      );
    }
  }

  getProjets(): void {
    this.projetService.getProjets().subscribe(
      (response: Projet[]) => {
        this.projets = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    );
  }

  editProjet(id: number): void {
    this.projetService.getProjetById(id).subscribe(
      (response: Projet) => {
        this.projet = response; // Remplir le formulaire avec les détails du projet
      },
      (error) => {
        console.error('Erreur lors de la récupération du projet:', error);
      }
    );
  }

  deleteProjet(id: number): void {
    this.projetService.deleteProjet(id).subscribe(
      () => {
        console.log('Projet supprimé avec succès');
        // Supprimer le projet de la liste
        this.projets = this.projets.filter(p => p.id !== id);
      },
      (error) => {
        console.error('Erreur lors de la suppression du projet:', error);
      }
    );
  }

  resetForm(): void {
    this.projet = {
      id: 0,
      nom: '',
      emplacement: '',
      dateDebut: '',
      dateFin: '',
      responsable: '',
      etat: 'En cours',
      commentaire: ''
    };
  }
}
