import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Pour la gestion des formulaires
import { HttpClientModule } from '@angular/common/http'; // Pour effectuer des requêtes HTTP
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Composants de votre application
import { AppComponent } from './app.component';
import { ProjetComponent } from './projet/projet.component';
import { PointageComponent } from './pointage/pointage.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { RapportComponent } from './rapport/rapport.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { TechnicienComponent } from './technicien/technicien.component';

// Modules supplémentaires
import { AppRoutingModule } from './app-routing.module'; // Gestion des routes
import { provideHttpClient, withFetch } from '@angular/common/http'; // Pour la configuration withFetch

@NgModule({
  declarations: [
    AppComponent,
    ProjetComponent,
    PointageComponent,
    EvaluationComponent,
    RapportComponent,
    TechnicienComponent,
    DashboardComponent,
    CalendrierComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Pour la gestion des formulaires
    CommonModule, // Pour les directives Angular communes
    HttpClientModule, // Pour les requêtes HTTP
    AppRoutingModule, // Module de routage
    RouterModule // Pour la gestion des routes et RouterLink
  ],
  providers: [
    provideHttpClient(withFetch()) // Configuration HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
