package com.oualanger.grhBackEnd.Evaluation.Dto;

import com.oualanger.grhBackEnd.Projet.Dto.ProjetDto;
import com.oualanger.grhBackEnd.Technicien.Dto.TechnicienDto;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class EvaluationDto {

    private Long id;
    private String qualite;
    private String delai;
    private String cooperation;
    private String commentaire;
    private LocalDateTime dateEvaluation;
    private int scoreTotal;
    private String formation;

    private List<ProjetDto> projets;
    private TechnicienDto technicien;  // Assurez-vous d'utiliser TechnicienDto ici
}
