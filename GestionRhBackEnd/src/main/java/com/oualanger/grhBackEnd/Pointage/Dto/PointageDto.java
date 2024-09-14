package com.oualanger.grhBackEnd.Pointage.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PointageDto {

    private Long id;
    private Long technicienId;
    private LocalDateTime dateHeureDebut;
    private LocalDateTime dateHeureFin;
    private Integer heureSupplementaire;

    // Getters et Setters
}
