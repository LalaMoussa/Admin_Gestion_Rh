package com.oualanger.grhBackEnd.Projet.controller;

import com.oualanger.grhBackEnd.Projet.Dto.ProjetDto;
import com.oualanger.grhBackEnd.Projet.service.ProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjetController {

    @Autowired
    private ProjetService projetService;

    @GetMapping("/projets")
    public List<ProjetDto> getAllProjets() {
        // Appelle la méthode findAll() du service, qui renvoie une liste de ProjetDto
        return projetService.findAll();
    }

    @GetMapping("/projets/{id}")
    public ResponseEntity<ProjetDto> getProjetById(@PathVariable Long id) {
        Optional<ProjetDto> projetDto = projetService.findById(id);
        return projetDto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build()); // Retourne 404 si le projet n'existe pas
    }

    @PostMapping("/projets")
    public ResponseEntity<ProjetDto> createProjet(@RequestBody ProjetDto projetDto) {
        ProjetDto savedProjetDto = projetService.save(projetDto);
        return ResponseEntity.status(201).body(savedProjetDto); // Retourne 201 pour une création réussie
    }

    @PutMapping("/projets/{id}")
    public ResponseEntity<ProjetDto> updateProjet(@PathVariable Long id, @RequestBody ProjetDto projetDto) {
        if (projetService.findById(id).isPresent()) {
            projetDto.setId(id); // Met à jour l'ID du projet
            ProjetDto updatedProjetDto = projetService.save(projetDto);
            return ResponseEntity.ok(updatedProjetDto); // Retourne 200 pour une mise à jour réussie
        } else {
            return ResponseEntity.notFound().build(); // Retourne 404 si le projet n'existe pas
        }
    }

    @DeleteMapping("/projets/{id}")
    public ResponseEntity<Void> deleteProjet(@PathVariable Long id) {
        if (projetService.findById(id).isPresent()) {
            projetService.deleteById(id); // Supprime un projet par son ID
            return ResponseEntity.noContent().build(); // Retourne 204 pour une suppression réussie
        } else {
            return ResponseEntity.notFound().build(); // Retourne 404 si le projet n'existe pas
        }
    }
}
