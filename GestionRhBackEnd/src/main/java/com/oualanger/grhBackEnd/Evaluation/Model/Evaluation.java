package com.oualanger.grhBackEnd.Evaluation.Model;

import com.oualanger.grhBackEnd.Projet.model.Projet;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
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

    @ManyToOne
    @JoinColumn(name = "projet_id", nullable = false)
    private Projet projetEvalue;

    @ManyToOne
    @JoinColumn(name = "technicien_id", nullable = false)
    private Technicien technicien;

    private String qualite;
    private String delai;
    private String cooperation;
    private String commentaire;
    private LocalDateTime dateEvaluation;
    private int scoreTotal;
    private String formation; // Formation recommandée
}
