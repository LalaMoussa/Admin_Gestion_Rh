package com.oualanger.grhBackEnd.Technicien.Dto;

import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Projet.model.Projet;
import lombok.Data;

import java.util.List;

@Data
public class TechnicienDto {

    private Long id;
    private String matricule; // Ajouté
    private String nom;
    private String prenom;
    private String dateRecrutement; // Ajouté
    private String dateNaissance; // Ajouté
    private String telephone; // Ajouté
    private String email; // Ajouté
    private String cin; // Ajouté

    private String adresseRue; // Nouvel attribut
    private String adresseVille; // Nouvel attribut
    private String adresseRegion; // Nouvel attribut
    private String adresseCodePostal; // Nouvel attribut

    private String situationFamiliale; // Ajouté
    private String fonction; // Ajouté
    private List<Projet> projets;

    private List<Evaluation> evaluations;

}
