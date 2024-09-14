package com.oualanger.grhBackEnd.Pointage.Dto;

import com.oualanger.grhBackEnd.Technicien.Dto.TechnicienDto;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class PointageDto {

    private Long id;
    private Long technicienId; // ID du technicien
    private LocalDate date;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private int heureSup;
    private String commentaire;
    private TechnicienDto technicien; // Objet DTO pour le technicien
}
