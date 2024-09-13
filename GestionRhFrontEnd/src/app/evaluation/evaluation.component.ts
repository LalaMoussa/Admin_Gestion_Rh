import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../Service/evalutation-service.service';
import { Evaluation } from '../models/evaluation.model';
import { Technicien } from '../models/technicien.model'; // Importer le modèle Technicien

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
})
export class EvaluationComponent implements OnInit {
  evaluation: Evaluation = {
    id: 0,
    technicien: { 
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
    },
    qualite: 'Bien',
    delai: 'Bien',
    cooperation: 'Bien',
    formation:'Pas de formation',
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

  criteres: Array<keyof Evaluation> = ['qualite', 'delai', 'cooperation']; // Utiliser les clés d'Evaluation
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
      this.evaluations = evaluations.map(evaluation => ({
        ...evaluation,
        technicien: evaluation.technicien || {
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
        }
      }));
      
      this.filteredEvaluations = this.paginate(this.evaluations);
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
        evaluation.technicien && // Check if technicien exists
        (evaluation.technicien.nom.toLowerCase().includes(query) || 
        evaluation.technicien.prenom.toLowerCase().includes(query))
      );
    } else {
      this.filteredEvaluations = this.evaluations;
    }
  
    this.totalPages = Math.ceil(this.filteredEvaluations.length / this.itemsPerPage);
    this.goToPage(1);
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
    // Calculate the total score for the evaluation
    const scoreTotal = this.calculateScore(this.evaluation);
  
    // Check if in edit mode (editing an existing evaluation)
    if (this.editMode) {
      // Update the existing evaluation
      this.evaluationService.updateEvaluation(this.evaluation.id, { ...this.evaluation, scoreTotal })
        .subscribe(() => {
          this.showToast('Évaluation mise à jour avec succès !', 'success'); // Show success message
          this.loadEvaluations(); // Reload evaluations list
        }, () => {
          this.showToast('Erreur lors de la mise à jour de l\'évaluation', 'error'); // Show error message
        });
    } else {
      // Create a new evaluation
      this.evaluationService.createEvaluation({ ...this.evaluation, scoreTotal })
        .subscribe(() => {
          this.showToast('Évaluation ajoutée avec succès !', 'success'); // Show success message
          this.loadEvaluations(); // Reload evaluations list
        }, () => {
          this.showToast('Erreur lors de l\'ajout de l\'évaluation', 'error'); // Show error message
        });
    }
  
    // Close the form after saving
    this.toggleForm();
  }
  
  editEvaluation(id: number) {
    const evaluationToEdit = this.evaluations.find(evaluation => evaluation.id === id);
    if (evaluationToEdit) {
      this.evaluation = { ...evaluationToEdit };
      this.showForm = true;
      this.editMode = true;
    }
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

  calculateScore(evaluation: Evaluation): number {
    let total = 0;
    for (const critere of this.criteres) {
      const score = this.scores[evaluation[critere] as keyof typeof evaluation];
      if (score !== undefined) {
        total += score;
      }
    }
    return total / this.criteres.length;
  }

  resetForm() {
    this.evaluation = {
      id: 0,
      technicien: { 
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
      },
      qualite: 'Bien',
      delai: 'Bien',
      cooperation: 'Bien',
      formation:'Pas de formation',
      commentaire: '',
      scoreTotal: 0
    };
    this.currentTab = 'infos'; // Réinitialiser l'onglet à 'infos'
  }

  showToast(message: string, type: string) {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filteredEvaluations = this.paginate(this.evaluations);
    }
  }
}
