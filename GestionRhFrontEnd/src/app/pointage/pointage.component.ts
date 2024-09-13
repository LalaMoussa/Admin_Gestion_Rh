import { Component, OnInit } from '@angular/core';
import { PointageService } from '../Service/pointage-service.service';
import { TechnicienService } from '../Service/technicien-service.service';
import { Pointage } from '../models/pointage.model';
import { Technicien } from '../models/technicien.model';

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css']
})
export class PointageComponent implements OnInit {
  pointages: Pointage[] = [];
  filteredPointages: Pointage[] = [];
  pagedPointages: Pointage[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  searchQuery: string = '';
  showForm: boolean = false;
  currentTab: string = 'infos';
  toastMessage: string | null = null;
  toastType: string | null = null;
  pointage: Pointage = {
    id: 0,
    technicien: null,
    date: '',
    heureDebut: '',
    heureFin: '',
    commentaire: ''
  };
  techniciens: Technicien[] = [];
  searchTechnicien: string = '';
  filteredTechniciens: Technicien[] = [];

  constructor(
    private pointageService: PointageService,
    private technicienService: TechnicienService
  ) { }

  ngOnInit(): void { 
    this.loadPointages();
    this.loadTechniciens();
  }

  loadPointages(): void {
    this.pointageService.getPointages().subscribe((data: Pointage[]) => {
      this.pointages = data;
      this.filteredPointages = data;
      this.updatePagination();
    }, error => {
      console.error('Erreur lors du chargement des pointages:', error);
    });
  }

  loadTechniciens(): void {
    this.technicienService.getTechniciens().subscribe((data: Technicien[]) => {
      this.techniciens = data;
      this.filteredTechniciens = data;
    }, error => {
      console.error('Erreur lors du chargement des techniciens:', error);
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetPointageForm();
    }
  }

  resetPointageForm(): void {
    this.pointage = {
      id: 0,
      technicien: null,
      date: '',
      heureDebut: '',
      heureFin: '',
      commentaire: ''
    };
  }

  changeTab(tabName: string): void {
    this.currentTab = tabName;
  }

  onSubmit(): void {
    if (this.pointage.id !== 0) {
      this.pointageService.updatePointage(this.pointage.id, this.pointage).subscribe(() => {
        this.showToast('Pointage mis à jour avec succès', 'success');
        this.loadPointages();
        this.toggleForm();
      }, error => {
        console.error('Erreur lors de la mise à jour du pointage:', error);
      });
    } else {
      this.pointageService.createPointage(this.pointage).subscribe(() => {
        this.showToast('Pointage ajouté avec succès', 'success');
        this.loadPointages();
        this.toggleForm();
      }, error => {
        console.error('Erreur lors de l\'ajout du pointage:', error);
      });
    }
  }

  editPointage(id: number): void {
    this.pointageService.getPointage(id).subscribe((data: Pointage) => {
      this.pointage = data;
      this.showForm = true;
    }, error => {
      console.error('Erreur lors de la récupération du pointage:', error);
    });
  }
  

  confirmDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce pointage ?')) {
      this.pointageService.deletePointage(id).subscribe(() => {
        this.showToast('Pointage supprimé avec succès', 'success');
        this.loadPointages();
      }, error => {
        console.error('Erreur lors de la suppression du pointage:', error);
      });
    }
  }

  calculateHoursWorked(pointage: Pointage): number {
    const start = new Date(`1970-01-01T${pointage.heureDebut}`);
    const end = new Date(`1970-01-01T${pointage.heureFin}`);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return diff;
  }

  calculateOvertimeHours(pointage: Pointage): number {
    const hoursWorked = this.calculateHoursWorked(pointage);
    return Math.max(0, hoursWorked - 8);
  }

  showToast(message: string, type: string): void {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = null;
      this.toastType = null;
    }, 3000);
  }

  filterPointages(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredPointages = this.pointages;
    } else {
      this.filteredPointages = this.pointages.filter(pointage =>
        (pointage.technicien?.nom + ' ' + pointage.technicien?.prenom).toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPointages.length / this.itemsPerPage);
    this.pagedPointages = this.filteredPointages.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  filterTechniciens(): void {
    if (this.searchTechnicien.trim() === '') {
      this.filteredTechniciens = this.techniciens;
    } else {
      this.filteredTechniciens = this.techniciens.filter(technicien =>
        (technicien.nom + ' ' + technicien.prenom).toLowerCase().includes(this.searchTechnicien.toLowerCase())
      );
    }
  }

  getTechnicienName(technicienId: number | null | undefined): string {
    if (technicienId === undefined || technicienId === null) {
        return 'Technicien non attribué';
    }
    const technicien = this.techniciens.find(t => t.id === technicienId);
    return technicien ? technicien.nom : 'Technicien introuvable';
  }
}