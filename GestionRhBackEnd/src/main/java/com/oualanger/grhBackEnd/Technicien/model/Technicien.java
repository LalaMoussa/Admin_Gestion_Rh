package com.oualanger.grhBackEnd.Technicien.model;

import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Pointage.Model.Pointage;
import com.oualanger.grhBackEnd.Projet.model.Projet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Technicien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String matricule;
    private String nom;
    private String prenom;
    private LocalDate dateRecrutement;
    private LocalDate dateNaissance;
    private String telephone;
    private String email;
    private String cin;

    private String adresseRue;
    private String adresseVille;
    private String adresseRegion;
    private String adresseCodePostal;

    private String situationFamiliale;
    private String fonction;

    @ManyToMany
    @JoinTable(
            name = "technicien_projet",
            joinColumns = @JoinColumn(name = "technicien_id"),
            inverseJoinColumns = @JoinColumn(name = "projet_id")
    )
    private List<Projet> projets;

    @OneToMany(mappedBy = "technicien")
    private List<Evaluation> evaluations;

    @OneToMany(mappedBy = "technicien")
    private List<Pointage> pointages;
}
