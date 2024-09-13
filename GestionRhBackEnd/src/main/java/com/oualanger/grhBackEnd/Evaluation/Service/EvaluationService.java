package com.oualanger.grhBackEnd.Evaluation.Service;

import com.oualanger.grhBackEnd.Evaluation.Dto.EvaluationDto;
import com.oualanger.grhBackEnd.Evaluation.Mappers.EvaluationMapper;
import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Evaluation.Repository.EvaluationRepository;
import com.oualanger.grhBackEnd.Technicien.Dto.TechnicienDto;
import com.oualanger.grhBackEnd.Technicien.Mappers.TechnicienMapper;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import com.oualanger.grhBackEnd.Technicien.service.TechnicienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private EvaluationMapper evaluationMapper;

    @Autowired
    private TechnicienService technicienService;

    @Autowired
    private TechnicienMapper technicienMapper;

    public EvaluationDto getEvaluationById(Long id) {
        Evaluation evaluation = evaluationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evaluation not found"));
        return evaluationMapper.toDTO(evaluation);
    }

    public EvaluationDto createEvaluation(EvaluationDto evaluationDTO) {
        Evaluation evaluation = evaluationMapper.toModel(evaluationDTO);
        Evaluation savedEvaluation = evaluationRepository.save(evaluation);
        return evaluationMapper.toDTO(savedEvaluation);
    }

    public EvaluationDto updateEvaluation(Long id, EvaluationDto evaluationDTO) {
        Evaluation evaluation = evaluationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evaluation not found"));

        // Mettre à jour les champs nécessaires ici
        evaluation.setQualite(evaluationDTO.getQualite());
        evaluation.setDelai(evaluationDTO.getDelai());
        evaluation.setCooperation(evaluationDTO.getCooperation());
        evaluation.setCommentaire(evaluationDTO.getCommentaire());
        evaluation.setDateEvaluation(evaluationDTO.getDateEvaluation());
        evaluation.setScoreTotal(evaluationDTO.getScoreTotal());
        evaluation.setFormation(evaluationDTO.getFormation());

        // Convertir TechnicienDto en Technicien et mettre à jour
        Technicien technicien = technicienMapper.toModel(evaluationDTO.getTechnicien());
        evaluation.setTechnicien(technicien);

        Evaluation updatedEvaluation = evaluationRepository.save(evaluation);
        return evaluationMapper.toDTO(updatedEvaluation);
    }

    public void deleteEvaluation(Long id) {
        evaluationRepository.deleteById(id);
    }

    public List<EvaluationDto> getAllEvaluations() {
        List<Evaluation> evaluations = evaluationRepository.findAll();
        return evaluationMapper.toDTOs(evaluations);
    }

    public Evaluation saveEvaluation(EvaluationDto evaluationDto) {
        // Convertir TechnicienDto en Technicien
        Technicien technicien = technicienMapper.toModel(evaluationDto.getTechnicien());

        // Créez une nouvelle évaluation en utilisant EvaluationMapper
        Evaluation evaluation = evaluationMapper.toModel(evaluationDto);
        evaluation.setTechnicien(technicien);

        // Sauvegardez l'évaluation
        return evaluationRepository.save(evaluation);
    }
}
