import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  status = false; // Contrôle la visibilité de la sidebar

  // Fonction pour basculer la visibilité de la sidebar
  addToggle() {
    this.status = !this.status;
  }

  title = 'GestionRhFrontEnd';
}
