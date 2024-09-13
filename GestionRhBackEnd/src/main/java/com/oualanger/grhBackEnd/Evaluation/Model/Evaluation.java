package com.oualanger.grhBackEnd.Evaluation.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "projet_id", referencedColumnName = "id")
    @JsonIgnoreProperties("evaluations")
    private Projet projetEvalue;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "technicien_id", referencedColumnName = "id")
    @JsonIgnoreProperties("evaluations")
    private Technicien technicien;

    private String qualite;
    private String delai;
    private String cooperation;
    private String commentaire;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateEvaluation;

    private int scoreTotal;
    private String formation; // Formation recommandée
}
