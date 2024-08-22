import { Component, OnInit } from '@angular/core';
import { TechnicienService } from '../Service/technicien-service.service'; // Assurez-vous que le chemin est correct
import { Technicien } from '../models/technicien.model'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-technicien',
  templateUrl: './technicien.component.html',
  styleUrls: ['./technicien.component.css']
})
export class TechnicienComponent implements OnInit {
  technicien: Technicien = {
    id: 0,
    matricule: '',
    nom: '',
    prenom: '',
    dateRecrutement: '',
    dateNaissance: '',
    telephone: '',
    email: '',
    cin: '',
    adresseRue: '',
    adresseVille: '',
    adresseRegion: '',
    adresseCodePostal: '',
    situationFamiliale: '',
    fonction: ''
  };

  techniciens: Technicien[] = [];
  showForm: boolean = false;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  editIndex: number | null = null;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';

  // Liste des situations familiales
  situationsFamiliales: string[] = ['Célibataire', 'Marié', 'Divorcé', 'Veuf'];

  constructor(private technicienService: TechnicienService) { }

  ngOnInit(): void {
    this.loadTechniciens();
  }

  // Fonction pour charger les techniciens depuis le service
  loadTechniciens(): void {
    this.technicienService.getTechniciens().subscribe(
      (data: Technicien[]) => {
        this.techniciens = data;
      },
      error => {
        console.error('Erreur lors du chargement des techniciens', error);
      }
    );
  }

  // Fonction pour afficher ou masquer le formulaire
  toggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.resetForm();
    }
  }

  // Fonction pour ajouter un technicien
  saveTechnicien(): void {
    if (this.isFormValid()) {
      this.technicienService.createTechnicien(this.technicien).subscribe(
        (data: Technicien) => {
          this.techniciens.push(data);
          this.showToast('Technicien ajouté avec succès !', 'success');
          this.resetForm();
          this.toggleForm();
        },
        error => {
          console.error('Erreur lors de l\'ajout du technicien', error);
          this.showToast('Erreur lors de l\'ajout du technicien.', 'error');
        }
      );
    } else {
      this.showToast('Veuillez remplir tous les champs.', 'error');
    }
  }

  // Fonction pour mettre à jour un technicien
  updateTechnicien(id: number): void {
    if (this.isFormValid()) {
      this.technicienService.updateTechnicien(id, this.technicien).subscribe(
        (data: Technicien) => {
          const index = this.techniciens.findIndex(t => t.id === id);
          if (index !== -1) {
            this.techniciens[index] = data;
            this.showToast('Technicien mis à jour avec succès !', 'success');
            this.resetForm();
            this.toggleForm();
          }
        },
        error => {
          console.error('Erreur lors de la mise à jour du technicien', error);
          this.showToast('Erreur lors de la mise à jour du technicien.', 'error');
        }
      );
    } else {
      this.showToast('Veuillez remplir tous les champs.', 'error');
    }
  }

  // Fonction pour réinitialiser le formulaire
  resetForm(): void {
    this.technicien = {
      id: 0,
      matricule: '',
      nom: '',
      prenom: '',
      dateRecrutement: '',
      dateNaissance: '',
      telephone: '',
      email: '',
      cin: '',
      adresseRue: '',
      adresseVille: '',
      adresseRegion: '',
      adresseCodePostal: '',
      situationFamiliale: '',
      fonction: ''
    };
  }

  // Fonction pour vérifier si tous les champs sont remplis
  isFormValid(): boolean {
    return Object.values(this.technicien).every(value => value.trim() !== '');
  }

  // Fonction pour éditer un technicien
  editTechnicien(id: number): void {
    this.technicienService.getTechnicienById(id).subscribe(
      (data: Technicien) => {
        this.technicien = { ...data };
        this.editIndex = this.techniciens.findIndex(t => t.id === id);
        this.toggleForm();
      },
      error => {
        console.error('Erreur lors de la récupération du technicien', error);
      }
    );
  }

  // Fonction pour supprimer un technicien
  deleteTechnicien(id: number): void {
    this.technicienService.deleteTechnicien(id).subscribe(
      () => {
        this.techniciens = this.techniciens.filter(t => t.id !== id);
        this.showToast('Technicien supprimé avec succès !', 'success');
      },
      error => {
        console.error('Erreur lors de la suppression du technicien', error);
        this.showToast('Erreur lors de la suppression du technicien.', 'error');
      }
    );
  }

  // Fonction pour filtrer les techniciens en fonction de la recherche
  get filteredTechniciens(): Technicien[] {
    return this.techniciens.filter(tech => 
      tech.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      tech.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Fonction pour changer de page
  goToPage(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.techniciens.length / this.itemsPerPage);
  }

  // Fonction pour afficher un message toast
  showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => this.toastMessage = '', 3000); // Masquer le message après 3 secondes
  }
}
