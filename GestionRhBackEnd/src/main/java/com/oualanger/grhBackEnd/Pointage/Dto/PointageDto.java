package com.oualanger.grhBackEnd.Pointage.Dto;

import com.oualanger.grhBackEnd.Pointage.Model.Pointage;
import com.oualanger.grhBackEnd.Technicien.Dto.TechnicienDto;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;


@Data
public class PointageDto {

    private Long id;
    private LocalDate date;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private int heureSup;
    private String commentaire;

    // Méthode de mapping d'un Pointage en PointageDto
    public static PointageDto mapToPointageRequest(Pointage pointage) {
        PointageDto mappedPointageRequest = new PointageDto();

        // Mapping des champs
        mappedPointageRequest.setId(pointage.getId());
        mappedPointageRequest.setDate(pointage.getDate()); // Conversion LocalDate en String
        mappedPointageRequest.setHeureDebut(pointage.getHeureDebut()); // Conversion LocalTime en String
        mappedPointageRequest.setHeureFin(pointage.getHeureFin()); // Conversion LocalTime en String
        mappedPointageRequest.setCommentaire(pointage.getCommentaire());
        mappedPointageRequest.setHeureSup(pointage.getHeureSup());

        return mappedPointageRequest;
    }

}
