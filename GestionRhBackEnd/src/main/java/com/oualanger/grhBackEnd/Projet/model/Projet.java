package com.oualanger.grhBackEnd.Projet.model;

import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Projet {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String nom;
        private String emplacement;
        private LocalDate dateDebut;
        private LocalDate dateFin;
        private String responsable;
        private String etat;
        private String commentaire;

        @ManyToMany(mappedBy = "projets")
        private List<Technicien> techniciens;
}
