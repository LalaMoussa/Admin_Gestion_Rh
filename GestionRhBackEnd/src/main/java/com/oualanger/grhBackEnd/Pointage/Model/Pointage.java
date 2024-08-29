package com.oualanger.grhBackEnd.Pointage.Model;

import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pointage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "heure_debut")
    private LocalTime heureDebut;

    @Column(name = "heure_fin")
    private LocalTime heureFin;

    @Column(name = "heure_sup")
    private LocalTime heureSup;

    @ManyToOne
    @JoinColumn(name = "technicien_id") // Assurez-vous d'utiliser la clé étrangère correcte
    private Technicien technicien; // Remplacez Long par Technicien
}
