package com.oualanger.grhBackEnd.Technicien.model;

import com.oualanger.grhBackEnd.Projet.model.Projet;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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
    private String dateRecrutement;
    private String dateNaissance;
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
    private List<Projet> projets;
}
