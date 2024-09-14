import { Component, OnInit } from '@angular/core';
import { Projet } from '../models/projet.model';
import { ProjetService } from '../Service/projet-service.service';
import { Technicien } from '../models/technicien.model';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  searchQuery: string = '';
  projets: Projet[] = [];
  projetTechniciens: Projet[] = [];
  techniciens: Technicien[] = [];
  filteredProjets: Projet[] = [];
  selectedRapport: Projet | undefined;


  constructor(private projetService: ProjetService) { }

  rapportContenu: string = '';
  dateCreation: string = new Date().toISOString().split('T')[0]; // Date du jour
  etat: string = 'en cours';

  ngOnInit(): void {
    this.getProjets();
    this.filterRapports(); // Initialiser filteredRapports avec la liste complète
  }

  getProjets(): void {
    this.projetService.getProjets().subscribe(
      (data: Projet[]) => {
        this.projets = data;
        this.filterProjetTechniciens();
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }

  showDetails(projet: Projet): void {
    this.selectedRapport = this.selectedRapport === projet ? undefined : projet;
  }

  filterProjetTechniciens(): void {
    this.projetTechniciens = this.projets.filter(projet => 
      projet.techniciens && projet.techniciens.some(tech => tech !== null)
    );
   
  }
  
 
  printReport(projet: Projet): void {
    
     // Default values if not set
  const dateCreationRapport = projet.dateCreationRapport || this.dateCreation;
  const contenuRapport = projet.contenuRapport || 'Entrer un contenu';
    const printWindow = window.open('', '_blank');

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Rapport de Projet</title>
            <style>
              body { font-family: Arial, sans-serif; }
              .rapport-container { width: 100%; padding: 20px; }
              .rapport-details { border: 1px solid #ddd; padding: 20px; background-color: #ffffff; }
              h1 { color: #007bff; }
              h2, h3 { color: #007bff; }
            </style>
          </head>
          <body>
            <div class="rapport-container">
              <header>
                <h1>Rapport de Projet</h1>
              </header>
              <section class="rapport-details">
                <h2>Informations du Projet</h2>
                <p><strong>Nom :</strong> ${projet.nom}</p>
                <p><strong>Emplacement :</strong> ${projet.emplacement}</p>
                <p><strong>Date de Début :</strong> ${new Date(projet.dateDebut).toLocaleDateString()}</p>
                <p><strong>Date de Fin :</strong> ${new Date(projet.dateFin).toLocaleDateString()}</p>
                <p><strong>Responsable :</strong> ${projet.responsable}</p>
                <p><strong>État :</strong> ${projet.etat}</p>
                <p><strong>Commentaire :</strong> ${projet.commentaire}</p>
                <h3>Techniciens Assignés</h3>
                <ul>
                  ${projet.techniciens && projet.techniciens.length > 0 ? projet.techniciens.map(tech => `
                    <li>
                      <p><strong>Nom :</strong> ${tech.nom} ${tech.prenom}</p>
                      <p><strong>Matricule :</strong> ${tech.matricule}</p>
                      <p><strong>Téléphone :</strong> ${tech.telephone}</p>
                      <p><strong>Email :</strong> ${tech.email}</p>
                      <p><strong>Adresse :</strong> ${tech.adresseRue}, ${tech.adresseVille}, ${tech.adresseRegion} ${tech.adresseCodePostal}</p>
                      <p><strong>Date de Recrutement :</strong> ${new Date(tech.dateRecrutement).toLocaleDateString()}</p>
                      <p><strong>Date de Naissance :</strong> ${new Date(tech.dateNaissance).toLocaleDateString()}</p>
                      <p><strong>CIN :</strong> ${tech.cin}</p>
                    </li>
                  `).join('') : '<li>Aucun technicien assigné</li>'}
                </ul>
              </section>
              <section class="rapport-content">
                <h2>Contenu du Rapport</h2>
                <p>${projet.contenuRapport}</p>
              </section>
              <footer>
                <p>Date de Création : ${projet.dateCreationRapport}</p>
                <p>État du Rapport : ${projet.etat}</p>
              </footer>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  }

  notifyReport(projet: Projet): void {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Nouveau Rapport', {
          body: `Un nouveau rapport a été généré pour le projet ${projet.nom}.`,
          icon: 'assets/logo.png'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Nouveau Rapport', {
              body: `Un nouveau rapport a été généré pour le projet ${projet.nom}.`,
              icon: 'assets/logo.png'
            });
          }
        });
      }
    } else {
      alert('Les notifications ne sont pas supportées par votre navigateur.');
    }
  }

  filterRapports(): void {
    this.filteredProjets = this.projets.filter(projet =>
      projet.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
