import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pointage } from '../models/pointage.model'; // Assurez-vous que ce modèle est défini correctement dans votre projet
import { PointageService } from '../Service/pointage-service.service'; // Assurez-vous que ce service est défini et injecté correctement

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css']
})
export class PointageComponent implements OnInit {
  pointage: Pointage = this.createEmptyPointage();
  pointages: Pointage[] = [];
  filteredPointages: Pointage[] = [];
  isEditMode: boolean = false;
  showForm: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  toastMessage: string = '';
  toastType: string = '';
  searchQuery: string = '';
  currentTab: string = 'infos'; 
  isFormValid: boolean = false;

  constructor(private pointageService: PointageService) {}

  ngOnInit(): void {
    this.getPointages();
  }

  onSubmit(pointageForm: NgForm): void {
    this.isFormValid = pointageForm.valid ?? false;
    if (this.isFormValid) {
      this.savePointage(); 
    } else {
      this.toastMessage = 'Veuillez remplir correctement tous les champs.';
      this.toastType = 'error';
      this.hideToastAfterDelay();
    }
  }

  savePointage(): void {
    if (this.isEditMode) {
      this.updatePointage();
    } else {
      this.createPointage();
    }
  }

  createPointage(): void {
    this.pointageService.createPointage(this.pointage).subscribe(
      (response: Pointage) => {
        this.toastMessage = 'Pointage créé avec succès';
        this.toastType = 'success';
        this.pointages.push(response);
        this.filteredPointages.push(response);
        this.updatePagination();
        this.resetForm();
      },
      (error) => {
        this.toastMessage = 'Erreur lors de la création du pointage';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }

  updatePointage(): void {
    this.pointageService.updatePointage(this.pointage.id, this.pointage).subscribe(
      (response: Pointage) => {
        const index = this.pointages.findIndex(p => p.id === this.pointage.id);
        if (index !== -1) {
          this.pointages[index] = response;
          this.filteredPointages[index] = response;
          this.updatePagination();
        }
        this.toastMessage = 'Pointage mis à jour avec succès';
        this.toastType = 'success';
        this.resetForm();
      },
      (error) => {
        this.toastMessage = 'Erreur lors de la mise à jour du pointage';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }

  editPointage(id: number): void {
    this.pointageService.getPointageById(id).subscribe(
      (response: Pointage) => {
        this.pointage = response;
        this.isEditMode = true;
        this.showForm = true;
      },
      (error) => {
        this.toastMessage = 'Erreur lors de la récupération du pointage';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }

  confirmDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce pointage ?')) {
      this.deletePointage(id);
    }
  }

  deletePointage(id: number): void {
    this.pointageService.deletePointage(id).subscribe(
      () => {
        this.pointages = this.pointages.filter(p => p.id !== id);
        this.filteredPointages = this.filteredPointages.filter(p => p.id !== id);
        this.updatePagination();
        this.toastMessage = 'Pointage supprimé avec succès';
        this.toastType = 'success';
        this.hideToastAfterDelay();
      },
      (error) => {
        this.toastMessage = 'Erreur lors de la suppression du pointage';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }

  getPointages(): void {
    this.pointageService.getPointages().subscribe(
      (response: Pointage[]) => {
        this.pointages = response;
        this.filteredPointages = response;
        this.updatePagination();
      },
      (error) => {
        this.toastMessage = 'Erreur lors de la récupération des pointages';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }

  filterPointages(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPointages = this.pointages.filter(p => p.nom.toLowerCase().includes(this.searchQuery));
    this.updatePagination();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.pointage = this.createEmptyPointage();
    this.isEditMode = false;
    this.isFormValid = false;
  }

  hideToastAfterDelay(): void {
    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredPointages = this.pointages.slice(start, end);
    this.totalPages = Math.ceil(this.pointages.length / this.itemsPerPage);
  }

  createEmptyPointage(): Pointage {
    return {
      id: 0,
      nom: '',
      date: '',
      heureDebut: '',
      heureFin: '',
      commentaire: ''
    };
  }

  calculateHoursWorked(pointage: Pointage): number {
    if (pointage.heureDebut && pointage.heureFin) {
      const start = new Date(`1970-01-01T${pointage.heureDebut}:00`);
      const end = new Date(`1970-01-01T${pointage.heureFin}:00`);
      const diffInMs = end.getTime() - start.getTime();
      return diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
    }
    return 0;
  }

  calculateOvertimeHours(pointage: Pointage): number {
    if (pointage.heureDebut && pointage.heureFin) {
      const start = new Date(`1970-01-01T${pointage.heureDebut}`);
      const end = new Date(`1970-01-01T${pointage.heureFin}`);
      const hoursWorked = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      
      // Suppose you consider overtime if hours worked exceed 8 hours
      const regularHours = 8;
      return hoursWorked > regularHours ? hoursWorked - regularHours : 0;
    }
    return 0;
  }

  changeTab(tab: string): void {
    this.currentTab = tab;
  }
}
