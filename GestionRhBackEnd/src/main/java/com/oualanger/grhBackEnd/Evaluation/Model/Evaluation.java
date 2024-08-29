package com.oualanger.grhBackEnd.Evaluation.Model;

import com.oualanger.grhBackEnd.Projet.model.Projet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "projet_id") // Nom de la colonne dans la table
    private Projet projetEvalue; // Référence à l'entité

    private String qualite;
    private String delai;
    private String cooperation;
    private String commentaire;
    private LocalDateTime dateEvaluation;
    private int scoreTotal;
    private String formation; // Formation recommandée
}
