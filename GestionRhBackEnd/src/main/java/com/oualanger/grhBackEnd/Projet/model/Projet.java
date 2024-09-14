package com.oualanger.grhBackEnd.Projet.model;

import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Projet {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String nom;
        private String emplacement;
        private LocalDate dateDebut;
        private LocalDate dateFin;
        private String responsable;
        private String etat;
        private String commentaire;

        @OneToMany(mappedBy = "projetEvalue")
        private List<Evaluation> evaluations;

        @ManyToMany(mappedBy = "projets")
        private List<Technicien> techniciens;

        private LocalDate dateCreationRapport;  // Can be null
        private String contenuRapport;
}
