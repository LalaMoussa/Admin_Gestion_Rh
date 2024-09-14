package com.oualanger.grhBackEnd.Evaluation.Dto;

import com.oualanger.grhBackEnd.Projet.model.Projet;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EvaluationDto {

    private Long id;

    private String qualite; // Ajouté pour correspondre aux données du formulaire
    private String delai; // Ajouté pour correspondre aux données du formulaire
    private String cooperation; // Ajouté pour correspondre aux données du formulaire
    private String commentaire; // Changement en "commentaire" pour correspondre au formulaire
    private LocalDateTime dateEvaluation;
    private int scoreTotal;
    private String formation; // Changez "Formation" en "formation" pour la cohérence

    private Projet projetEvalue ;
    private Technicien technicien;

}