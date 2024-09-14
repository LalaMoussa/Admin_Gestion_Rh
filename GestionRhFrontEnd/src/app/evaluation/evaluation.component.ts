import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../Service/evalutation-service.service';
import { Evaluation } from '../models/evaluation.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
})
export class EvaluationComponent implements OnInit {
  evaluation: Evaluation = {
    id: 0,
    qualite: 'Bien',
    delai: 'Bien',
    cooperation: 'Bien',
    commentaire: '',
    scoreTotal: 0
  };


  evaluations: Evaluation[] = [];
  filteredEvaluations: Evaluation[] = [];
  showForm: boolean = false;
  showDeleteConfirm: boolean = false;
  confirmDeleteId: number = 0;
  editMode: boolean = false;
  toastMessage: string = '';
  toastType: string = ''; // Ajout de la propriété 'toastType'
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  isFormValid: boolean = true;
  currentTab: string = 'infos'; // Ajout de la propriété 'currentTab'

  criteres: string[] = ['qualite', 'delai', 'cooperation']; // Définir les critères utilisés dans le formulaire
  scores: Record<string, number> = {
    'À améliorer': 1,
    'Assez bien': 2,
    'Bien': 3,
    'Excellent': 4
  };

  constructor(private evaluationService: EvaluationService) {}

  ngOnInit() {
    this.loadEvaluations();
  }

  loadEvaluations() {
    this.evaluationService.getEvaluations().subscribe(evaluations => {
      this.evaluations = evaluations;
      this.filteredEvaluations = this.paginate(evaluations);
      this.totalPages = Math.ceil(this.evaluations.length / this.itemsPerPage);
    });
  }

  paginate(evaluations: Evaluation[]): Evaluation[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return evaluations.slice(start, end);
  }

  filterEvaluations(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.toLowerCase();
    this.searchQuery = query;
  
    if (query) {
      this.filteredEvaluations = this.evaluations.filter(evaluation =>
        // Check if any technician's name contains the search query
        evaluation.technicien && evaluation.technicien.some(tech =>
          (tech.nom + ' ' + tech.prenom).toLowerCase().includes(query)
        )
      );
    } else {
      this.filteredEvaluations = this.evaluations;
    }
  
    // Update pagination after filtering
    this.totalPages = Math.ceil(this.filteredEvaluations.length / this.itemsPerPage);
    this.goToPage(1); // Reset to first page
  }
  
  

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
    this.editMode = false;
  }

  toggleDeleteConfirm(id: number = 0) {
    this.showDeleteConfirm = !this.showDeleteConfirm;
    this.confirmDeleteId = id;
  }

  saveEvaluation() {
    const scoreTotal = this.calculateScore(this.evaluation);

    if (this.editMode) {
      this.evaluationService.updateEvaluation(this.evaluation.id, { ...this.evaluation, scoreTotal }).subscribe(() => {
        this.showToast('Évaluation mise à jour avec succès !', 'success');
        this.loadEvaluations();
      });
    } else {
      this.evaluationService.createEvaluation({ ...this.evaluation, scoreTotal }).subscribe(() => {
        this.showToast('Évaluation ajoutée avec succès !', 'success');
        this.loadEvaluations();
      });
    }
    this.resetForm();
    this.toggleForm();
  }

  resetForm() {
    this.evaluation = {
      id: 0,
      qualite: 'Bien',
      delai: 'Bien',
      cooperation: 'Bien',
      commentaire: '',
      scoreTotal: 0
    };
    this.editMode = false;
  }

  calculateScore(evaluation: Evaluation): number {
    const qualiteScore = this.scores[evaluation.qualite];
    const delaiScore = this.scores[evaluation.delai];
    const cooperationScore = this.scores[evaluation.cooperation];
    return (qualiteScore + delaiScore + cooperationScore) / 3;
  }

  editEvaluation(id: number) {
    this.evaluationService.getEvaluationById(id).subscribe(evaluation => {
      this.evaluation = { ...evaluation };
      this.editMode = true;
      this.toggleForm();
    });
  }

  confirmDelete(id: number) {
    this.toggleDeleteConfirm(id);
  }

  deleteEvaluation(id: number) {
    this.evaluationService.deleteEvaluation(id).subscribe(() => {
      this.showToast('Évaluation supprimée avec succès !', 'success');
      this.loadEvaluations();
    });
    this.toggleDeleteConfirm();
  }
  

  goToPage(page: number) {
    this.currentPage = page;
    this.filteredEvaluations = this.paginate(this.evaluations);
  }

  showToast(message: string, type: string) {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = '';
      this.toastType = '';
    }, 3000);
  }
}
