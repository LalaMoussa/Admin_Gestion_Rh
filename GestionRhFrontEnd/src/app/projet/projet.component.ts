import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Projet } from '../models/projet.model';
import { Technicien } from '../models/technicien.model';
import { ProjetService } from '../Service/projet-service.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projet: Projet = this.createEmptyProjet();
  projets: Projet[] = [];
  filteredProjets: Projet[] = [];
  techniciens: Technicien[] = [];
  isEditMode: boolean = false;
  showForm: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  toastMessage: string = '';
  toastType: string = '';
  searchQuery: string = '';
  currentTab: string = 'details';
  isFormValid: boolean = false;
  dateFinInvalid: boolean = false;

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.isFormValid = false; // Initialisation
    this.getProjets();
   
  }
  

  onSubmit(form: NgForm): void {
    // Validation des dates si l'onglet actif est 'dates'
    if (this.currentTab === 'dates') {
      this.checkDateFin(); // Validation des dates
    }
  
    // Assurez-vous que form.valid est un boolean (peut-être le forcer à false si null)
    const formValid: boolean = form.valid ?? false; // Utilisation de 'false' par défaut si form.valid est null
  
    this.isFormValid = formValid && !this.dateFinInvalid; // Validation globale du formulaire
  
    console.log('Form valid:', formValid);
    console.log('Date fin invalid:', this.dateFinInvalid);
    console.log('Is form valid:', this.isFormValid);
  
    if (this.isFormValid) {
      this.saveProjet();
    } else {
      this.toastMessage = 'Veuillez remplir correctement tous les champs.';
      this.toastType = 'error';
      this.hideToastAfterDelay();
    }
  }  
  
  saveProjet(): void {
    if (this.isEditMode) {
      this.updateProjet(this.projet.id, this.projet);
    } else {
      this.createProjet();
    }
  }

  createProjet(): void {
    this.projetService.createProjet(this.projet).subscribe(
      (data: Projet) => {
        this.projets.push(data);
        this.filteredProjets = [...this.projets];
        this.toastMessage = 'Projet créé avec succès !';
        this.toastType = 'success';
        this.hideToastAfterDelay();
        this.resetForm();
      },
      (error: any) => {
        console.error('Erreur lors de la création du projet', error);
        this.toastMessage = 'Erreur lors de la création du projet.';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }

  updateProjet(id: number, projet: Projet): void {
    this.projetService.updateProjet(id, projet).subscribe(
      (data: Projet) => {
        const index = this.projets.findIndex(p => p.id === data.id);
        this.projets[index] = data;
        this.filteredProjets = [...this.projets];
        this.toastMessage = 'Projet mis à jour avec succès !';
        this.toastType = 'success';
        this.hideToastAfterDelay();
        this.resetForm();
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour du projet', error);
        this.toastMessage = 'Erreur lors de la mise à jour du projet.';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }

  editProjet(id: number): void {
    this.projetService.getProjets().subscribe(
      (data: Projet[]) => {
        const projet = data.find(p => p.id === id);
        if (projet) {
          this.projet = projet;
          this.isEditMode = true;
          this.showForm = true;
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du projet', error);
        this.toastMessage = 'Erreur lors de la récupération du projet.';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }

  confirmDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projetService.deleteProjet(id).subscribe(
        () => {
          this.projets = this.projets.filter(p => p.id !== id);
          this.filteredProjets = [...this.projets];
          this.toastMessage = 'Projet supprimé avec succès !';
          this.toastType = 'success';
          this.hideToastAfterDelay();
        },
        (error: any) => {
          console.error('Erreur lors de la suppression du projet', error);
          this.toastMessage = 'Erreur lors de la suppression du projet.';
          this.toastType = 'error';
          this.hideToastAfterDelay();
        }
      );
    }
  }

  getProjets(): void {
    this.projetService.getProjets().subscribe(
      (data: Projet[]) => {
        this.projets = data;
        this.filteredProjets = [...this.projets];
        this.totalPages = Math.ceil(this.projets.length / this.itemsPerPage);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }

  

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.projet = this.createEmptyProjet();
    this.currentTab = 'details';
    this.isEditMode = false;
    this.searchQuery = '';
    this.dateFinInvalid = false;
  }

  createEmptyProjet(): Projet {
    return {
      id: 0,
      nom: '',
      emplacement: '',
      dateDebut: '',
      dateFin: '',
      responsable: '',
      etat: 'en cours',
      commentaire: '',
      techniciens: []
    };
  }

  filterProjets(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value.toLowerCase();
    this.filteredProjets = this.projets.filter(projet =>
      projet.nom.toLowerCase().includes(query)
    );
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.filteredProjets = this.projets.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage);
    }
  }

  hideToastAfterDelay(): void {
    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

  checkDateFin(): void {
    if (this.projet.dateDebut && this.projet.dateFin) {
      this.dateFinInvalid = new Date(this.projet.dateFin) < new Date(this.projet.dateDebut);
    } else {
      this.dateFinInvalid = false;
    }
  }
}
