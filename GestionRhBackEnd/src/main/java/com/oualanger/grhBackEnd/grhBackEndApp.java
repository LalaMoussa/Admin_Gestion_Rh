package com.oualanger.grhBackEnd;

import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import com.oualanger.grhBackEnd.Projet.model.Projet;
import com.oualanger.grhBackEnd.Technicien.repository.TechnicienRepository;
import com.oualanger.grhBackEnd.Projet.repository.ProjetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class grhBackEndApp {

	public static void main(String[] args) {
		SpringApplication.run(grhBackEndApp.class, args);
	}

	@Bean
	public CommandLineRunner demo(TechnicienRepository technicienRepository, ProjetRepository projetRepository) {
		return (args) -> {
			// Create and save Technicien entities
			Technicien technicien1 = new Technicien();
			technicien1.setMatricule("T001");
			technicien1.setNom("Doe");
			technicien1.setPrenom("John");
			technicien1.setDateRecrutement(LocalDate.of(2020, 1, 15));
			technicien1.setDateNaissance(LocalDate.of(1990, 5, 20));
			technicien1.setTelephone("0123456789");
			technicien1.setEmail("john.doe@example.com");
			technicien1.setCin("AB123456");
			technicien1.setAdresseRue("123 Elm Street");
			technicien1.setAdresseVille("Springfield");
			technicien1.setAdresseRegion("Illinois");
			technicien1.setAdresseCodePostal("62701");
			technicien1.setSituationFamiliale("Married");
			technicien1.setFonction("Engineer");

			Technicien technicien2 = new Technicien();
			technicien2.setMatricule("T002");
			technicien2.setNom("Smith");
			technicien2.setPrenom("Jane");
			technicien2.setDateRecrutement(LocalDate.of(2021, 6, 25));
			technicien2.setDateNaissance(LocalDate.of(1992, 7, 30));
			technicien2.setTelephone("0987654321");
			technicien2.setEmail("jane.smith@example.com");
			technicien2.setCin("CD789012");
			technicien2.setAdresseRue("456 Oak Avenue");
			technicien2.setAdresseVille("Springfield");
			technicien2.setAdresseRegion("Illinois");
			technicien2.setAdresseCodePostal("62701");
			technicien2.setSituationFamiliale("Single");
			technicien2.setFonction("Technician");

			Technicien technicien3 = new Technicien();
			technicien3.setMatricule("T003");
			technicien3.setNom("Brown");
			technicien3.setPrenom("Charlie");
			technicien3.setDateRecrutement(LocalDate.of(2019, 3, 10));
			technicien3.setDateNaissance(LocalDate.of(1988, 8, 22));
			technicien3.setTelephone("1122334455");
			technicien3.setEmail("charlie.brown@example.com");
			technicien3.setCin("EF345678");
			technicien3.setAdresseRue("789 Pine Road");
			technicien3.setAdresseVille("Springfield");
			technicien3.setAdresseRegion("Illinois");
			technicien3.setAdresseCodePostal("62701");
			technicien3.setSituationFamiliale("Married");
			technicien3.setFonction("Consultant");

			technicienRepository.save(technicien1);
			technicienRepository.save(technicien2);
			technicienRepository.save(technicien3);

			// Create and save Projet entities
			Projet projet1 = new Projet();
			projet1.setNom("Project A");
			projet1.setEmplacement("Location 1");
			projet1.setDateDebut(LocalDate.of(2024, 1, 1));
			projet1.setDateFin(LocalDate.of(2024, 12, 31));
			projet1.setResponsable("Alice");
			projet1.setEtat("Active");
			projet1.setCommentaire("Project A details");

			Projet projet2 = new Projet();
			projet2.setNom("Project B");
			projet2.setEmplacement("Location 2");
			projet2.setDateDebut(LocalDate.of(2024, 3, 1));
			projet2.setDateFin(LocalDate.of(2024, 9, 30));
			projet2.setResponsable("Bob");
			projet2.setEtat("Inactive");
			projet2.setCommentaire("Project B details");

			Projet projet3 = new Projet();
			projet3.setNom("Project C");
			projet3.setEmplacement("Location 3");
			projet3.setDateDebut(LocalDate.of(2024, 6, 1));
			projet3.setDateFin(LocalDate.of(2024, 11, 30));
			projet3.setResponsable("Charlie");
			projet3.setEtat("Active");
			projet3.setCommentaire("Project C details");

			projetRepository.save(projet1);
			projetRepository.save(projet2);
			projetRepository.save(projet3);

			// Example of linking Technicien and Projet (if necessary)
			// This requires proper setup of relationships and repositories
		};
	}
}
