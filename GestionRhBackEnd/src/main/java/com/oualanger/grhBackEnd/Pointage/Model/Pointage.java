package com.oualanger.grhBackEnd.Pointage.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.oualanger.grhBackEnd.Projet.model.Projet;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pointage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
            name = "technicien_pointage",
            joinColumns = @JoinColumn(name = "technicien_id"),
            inverseJoinColumns = @JoinColumn(name = "pointage_id")
    )
    private List<Pointage> techniciens;

    private LocalDate date;

    @Column(name = "heure_debut")
    private LocalTime heureDebut;

    @Column(name = "heure_fin")
    private LocalTime heureFin;

    @Column(name = "commentaire")
    private String commentaire;

    @Column(name = "heureSup")
    private int heureSup;

}
