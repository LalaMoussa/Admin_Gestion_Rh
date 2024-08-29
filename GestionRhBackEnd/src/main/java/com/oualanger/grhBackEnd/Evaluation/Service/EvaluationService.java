package com.oualanger.grhBackEnd.Evaluation.Service;

import com.oualanger.grhBackEnd.Evaluation.Dto.EvaluationDto;
import com.oualanger.grhBackEnd.Evaluation.Mappers.EvaluationMapper;
import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Evaluation.Repository.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private EvaluationMapper evaluationMapper;

    public EvaluationDto getEvaluationById(Long id) {
        // Utilisez la classe Evaluation du package Model
        Evaluation evaluation = evaluationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evaluation not found"));
        return evaluationMapper.toDTO(evaluation);
    }

    public EvaluationDto createEvaluation(EvaluationDto evaluationDTO) {
        // Convertir EvaluationDTO en Evaluation (modèle)
        Evaluation evaluation = evaluationMapper.toModel(evaluationDTO);
        Evaluation savedEvaluation = evaluationRepository.save(evaluation);
        return evaluationMapper.toDTO(savedEvaluation);
    }

    public EvaluationDto updateEvaluation(Long id, EvaluationDto evaluationDTO) {
        // Utiliser Evaluation (modèle) et non EvaluationDTO ici
        Evaluation evaluation = evaluationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evaluation not found"));
        evaluationMapper.toDTO(evaluation);
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
}
