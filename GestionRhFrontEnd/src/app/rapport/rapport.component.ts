import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../Service/projet-service.service';
import { Projet } from '../models/projet.model';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  projets: Projet[] = [];
  filteredProjets: Projet[] = [];
  searchQuery: string = '';
  selectedRapport: Projet | null = null;

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.getProjets();
  }

  getProjets(): void {
    this.projetService.getProjets().subscribe(
      (data: Projet[]) => {
        console.log('Données récupérées:', data); // Vérifiez les données dans la console
        this.projets = data;
        this.filterRapports();
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }

  filterRapports(): void {
    this.filteredProjets = this.projets.filter(projet => 
      projet.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  showDetails(projet: Projet): void {
    this.selectedRapport = this.selectedRapport === projet ? null : projet;
  }

  printReport(projet: Projet): void {
    const dateCreationRapport = projet.dateCreationRapport || new Date();
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
                     
                    </li>
                  `).join('') : '<li>Aucun technicien assigné</li>'}
                </ul>
              </section>
              <section class="rapport-content">
                <h2>Contenu du Rapport</h2>
                <p>${contenuRapport}</p>
              </section>
              <footer>
                <p>Date de Création : ${new Date(dateCreationRapport).toLocaleDateString()}</p>
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
    // Implémentez la fonction pour envoyer une notification
    alert('Notification envoyée pour le rapport de : ' + projet.nom);
  }
}
