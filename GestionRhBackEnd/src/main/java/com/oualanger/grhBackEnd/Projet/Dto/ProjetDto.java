package com.oualanger.grhBackEnd.Projet.Dto;

import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ProjetDto {

    private Long id;
    private String nom;
    private String emplacement;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String responsable;
    private String etat;
    private String commentaire;
    private List<Technicien> techniciens;
    private List<Evaluation> evaluations;

    private LocalDate dateCreationRapport;
    private String contenuRapport;
}
