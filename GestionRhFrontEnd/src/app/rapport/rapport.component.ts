import { Component, OnInit } from '@angular/core';
import { RapportService } from '../Service/rapport-service.service';
import { Rapport } from '../models/rapport.model';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  rapports: Rapport[] = [];
  filteredRapports: Rapport[] = [];
  selectedRapport: Rapport | undefined;
  searchQuery: string = '';

  constructor(private rapportService: RapportService) { }

  ngOnInit(): void {
    this.loadRapports();
    this.filterRapports(); // Initialiser filteredRapports avec la liste complète
  }

  loadRapports(): void {
    this.rapports = [
      {
        id: 1,
        projet: {
          id: 1,
          nom: 'Développement d\'une application',
          emplacement: 'Casablanca',
          dateDebut: '2024-08-01',
          dateFin: '2024-09-01',
          responsable: 'Ahmed Ali',
          etat: 'En cours',
          commentaire: 'Le projet avance bien.',
          techniciens: [
            {
              id: 1,
              matricule: '12345',
              nom: 'Khalid',
              prenom: 'El Mansouri',
              dateRecrutement: '2022-01-01',
              dateNaissance: '1990-05-15',
              telephone: '0600000000',
              email: 'khalid@example.com',
              cin: 'AB123456',
              adresseRue: '123 Rue Exemple',
              adresseVille: 'Casablanca',
              adresseRegion: 'Grand Casablanca',
              adresseCodePostal: '20000',
              situationFamiliale: 'Célibataire',
              fonction: 'Développeur',
              projets: []
            }
          ],
          taches: []
        },
        technicien: {
          id: 1,
          matricule: '12345',
          nom: 'Khalid',
          prenom: 'El Mansouri',
          dateRecrutement: '2022-01-01',
          dateNaissance: '1990-05-15',
          telephone: '0600000000',
          email: 'khalid@example.com',
          cin: 'AB123456',
          adresseRue: '123 Rue Exemple',
          adresseVille: 'Casablanca',
          adresseRegion: 'Grand Casablanca',
          adresseCodePostal: '20000',
          situationFamiliale: 'Célibataire',
          fonction: 'Développeur',
          projets: []
        },
        contenu: 'Ce rapport fournit un aperçu de l\'état d\'avancement.',
        dateCreation: new Date().toISOString(),
        etat: 'Finalisé'
      },
      {
        id: 2,
        projet: {
          id: 2,
          nom: 'Révision de la base de données',
          emplacement: 'Rabat',
          dateDebut: '2024-07-01',
          dateFin: '2024-08-01',
          responsable: 'Sara Benali',
          etat: 'Terminé',
          commentaire: 'La révision a été complétée avec succès.',
          techniciens: [
            {
              id: 2,
              matricule: '67890',
              nom: 'Amine',
              prenom: 'Jouhari',
              dateRecrutement: '2021-03-15',
              dateNaissance: '1988-11-20',
              telephone: '0700000000',
              email: 'amine@example.com',
              cin: 'CD654321',
              adresseRue: '456 Rue Exemple',
              adresseVille: 'Rabat',
              adresseRegion: 'Rabat-Salé-Kénitra',
              adresseCodePostal: '10000',
              situationFamiliale: 'Marié',
              fonction: 'Analyste',
              projets: []
            }
          ],
          taches: []
        },
        technicien: {
          id: 2,
          matricule: '67890',
          nom: 'Amine',
          prenom: 'Jouhari',
          dateRecrutement: '2021-03-15',
          dateNaissance: '1988-11-20',
          telephone: '0700000000',
          email: 'amine@example.com',
          cin: 'CD654321',
          adresseRue: '456 Rue Exemple',
          adresseVille: 'Rabat',
          adresseRegion: 'Rabat-Salé-Kénitra',
          adresseCodePostal: '10000',
          situationFamiliale: 'Marié',
          fonction: 'Analyste',
          projets: []
        },
        contenu: 'Ce rapport détaille les modifications apportées à la base de données.',
        dateCreation: new Date().toISOString(),
        etat: 'Finalisé'
      }
    ];

    this.filterRapports(); // Mettre à jour la liste filtrée après le chargement
  }

  showDetails(rapport: Rapport): void {
    this.selectedRapport = this.selectedRapport === rapport ? undefined : rapport;
  }

  printReport(rapport: Rapport): void {
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
                <p><strong>Nom :</strong> ${rapport.projet.nom}</p>
                <p><strong>Emplacement :</strong> ${rapport.projet.emplacement}</p>
                <p><strong>Date de Début :</strong> ${new Date(rapport.projet.dateDebut).toLocaleDateString()}</p>
                <p><strong>Date de Fin :</strong> ${new Date(rapport.projet.dateFin).toLocaleDateString()}</p>
                <p><strong>Responsable :</strong> ${rapport.projet.responsable}</p>
                <p><strong>État :</strong> ${rapport.projet.etat}</p>
                <p><strong>Commentaire :</strong> ${rapport.projet.commentaire}</p>
                <h3>Techniciens Assignés</h3>
                <ul>
                  ${rapport.projet.techniciens && rapport.projet.techniciens.length > 0 ? rapport.projet.techniciens.map(tech => `
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
                <p>${rapport.contenu}</p>
              </section>
              <footer>
                <p>Date de Création : ${new Date(rapport.dateCreation).toLocaleDateString()}</p>
                <p>État du Rapport : ${rapport.etat}</p>
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

  notifyReport(rapport: Rapport): void {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Nouveau Rapport', {
          body: `Un nouveau rapport a été généré pour le projet ${rapport.projet.nom}.`,
          icon: 'assets/logo.png'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Nouveau Rapport', {
              body: `Un nouveau rapport a été généré pour le projet ${rapport.projet.nom}.`,
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
    this.filteredRapports = this.rapports.filter(rapport =>
      rapport.projet.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
