package com.oualanger.grhBackEnd.Pointage.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pointage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "technicien_id", referencedColumnName = "id")
    @JsonIgnoreProperties("pointages")
    private Technicien technicien;

    private LocalDate date;

    @Column(name = "heure_debut")
    private LocalTime heureDebut;

    @Column(name = "heure_fin")
    private LocalTime heureFin;

    @Column(name = "commentaire")
    private String commentaire;

    @Column(name = "heureSup")
    private int heureSup;

    // Ajoutez une méthode pour obtenir le nom du technicien si nécessaire
    public String getNomTechnicien() {
        return technicien != null ? technicien.getNom() : null; // Assurez-vous que `Technicien` a une méthode `getNom()`
    }
}
