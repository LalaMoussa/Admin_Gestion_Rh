package com.oualanger.grhBackEnd.Projet.service;

import com.oualanger.grhBackEnd.Projet.Dto.ProjetDto;
import com.oualanger.grhBackEnd.Projet.Mappers.ProjetMapper;
import com.oualanger.grhBackEnd.Projet.model.Projet;
import com.oualanger.grhBackEnd.Projet.repository.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjetService {

    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private ProjetMapper projetMapper;

    // Récupère tous les projets et les convertit en ProjetDto
    public List<ProjetDto> findAll() {
        return projetMapper.toDTOs(projetRepository.findAll());
    }

    // Récupère un projet par son ID et le convertit en ProjetDto
    public Optional<ProjetDto> findById(Long id) {
        return projetRepository.findById(id)
                .map(projetMapper::toDTO); // Convertit Projet en ProjetDto
    }

    // Enregistre un nouveau projet et le convertit en ProjetDto
    public ProjetDto save(ProjetDto projetDto) {
        Projet projet = projetMapper.toModel(projetDto); // Convertit ProjetDto en Projet

        return projetMapper.toDTO(projetRepository.save(projet)); // Convertit le Projet sauvegardé en ProjetDto
    }

    // Supprime un projet par son ID
    public void deleteById(Long id) {
        projetRepository.deleteById(id);
    }
}
