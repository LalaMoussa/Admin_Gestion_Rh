package com.oualanger.grhBackEnd.Pointage.Dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class PointageDto {

    private Long id;
    private Long technicienId; // ID du technicien
    private String technicienNom; // Nom du technicien
    private LocalDate date;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private String commentaire;
}
