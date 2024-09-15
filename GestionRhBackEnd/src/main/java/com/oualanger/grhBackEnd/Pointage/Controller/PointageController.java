package com.oualanger.grhBackEnd.Pointage.Controller;

import com.oualanger.grhBackEnd.Pointage.Dto.PointageDto;
import com.oualanger.grhBackEnd.Pointage.Service.PointageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Assurez-vous que l'origine correspond à votre application Angular
public class PointageController {

    @Autowired
    private PointageService pointageService;

    @PostMapping("/pointages")
    public ResponseEntity<PointageDto> createPointage(@RequestBody PointageDto pointageDTO) {
        PointageDto createdPointage = pointageService.createPointage(pointageDTO);
        return ResponseEntity.ok(createdPointage);
    }

    @GetMapping("/pointages/{id}")
    public ResponseEntity<PointageDto> getPointageById(@PathVariable Long id) {
        PointageDto pointageDTO = pointageService.getPointageById(id);
        if (pointageDTO != null) {
            return ResponseEntity.ok(pointageDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/pointages/{id}")
    public ResponseEntity<PointageDto> updatePointage(@PathVariable Long id, @RequestBody PointageDto pointageDTO) {
        PointageDto updatedPointage = pointageService.updatePointage(id, pointageDTO);
        if (updatedPointage != null) {
            return ResponseEntity.ok(updatedPointage);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/pointages/{id}")
    public ResponseEntity<Void> deletePointage(@PathVariable Long id) {
        boolean isDeleted = pointageService.deletePointage(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/pointages")
    public ResponseEntity<List<PointageDto>> getAllPointages() {
        List<PointageDto> pointages = pointageService.getAllPointages();
        return ResponseEntity.ok(pointages);
    }
}
