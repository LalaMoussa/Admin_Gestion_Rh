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
import java.util.List;

@SpringBootApplication
public class grhBackEndApp {

	public static void main(String[] args) {
		SpringApplication.run(grhBackEndApp.class, args);
	}

	@Bean
	public CommandLineRunner demo(TechnicienRepository technicienRepository, ProjetRepository projetRepository) {
		return (args) -> {
			// Create and save Technicien entities
			Technicien technicien2 = new Technicien();
			technicien2.setMatricule("T002");
			technicien2.setNom("Smith");
			technicien2.setPrenom("Anna");
			technicien2.setDateRecrutement(LocalDate.of(2019, 8, 12));
			technicien2.setDateNaissance(LocalDate.of(1985, 11, 22));
			technicien2.setTelephone("0987654321");
			technicien2.setEmail("anna.smith@example.com");
			technicien2.setCin("CD234567");
			technicien2.setAdresseRue("456 Oak Street");
			technicien2.setAdresseVille("Metropolis");
			technicien2.setAdresseRegion("New York");
			technicien2.setAdresseCodePostal("10001");
			technicien2.setSituationFamiliale("Single");
			technicien2.setFonction("Technician");

			Technicien technicien3 = new Technicien();
			technicien3.setMatricule("T003");
			technicien3.setNom("Brown");
			technicien3.setPrenom("James");
			technicien3.setDateRecrutement(LocalDate.of(2021, 3, 5));
			technicien3.setDateNaissance(LocalDate.of(1992, 7, 15));
			technicien3.setTelephone("1122334455");
			technicien3.setEmail("james.brown@example.com");
			technicien3.setCin("EF345678");
			technicien3.setAdresseRue("789 Pine Street");
			technicien3.setAdresseVille("Gotham");
			technicien3.setAdresseRegion("New Jersey");
			technicien3.setAdresseCodePostal("07001");
			technicien3.setSituationFamiliale("Divorced");
			technicien3.setFonction("Technician");

			Technicien technicien4 = new Technicien();
			technicien4.setMatricule("T004");
			technicien4.setNom("Johnson");
			technicien4.setPrenom("Emily");
			technicien4.setDateRecrutement(LocalDate.of(2022, 2, 25));
			technicien4.setDateNaissance(LocalDate.of(1993, 9, 10));
			technicien4.setTelephone("2233445566");
			technicien4.setEmail("emily.johnson@example.com");
			technicien4.setCin("GH456789");
			technicien4.setAdresseRue("321 Maple Avenue");
			technicien4.setAdresseVille("Star City");
			technicien4.setAdresseRegion("California");
			technicien4.setAdresseCodePostal("90001");
			technicien4.setSituationFamiliale("Married");
			technicien4.setFonction("Technician");

			Technicien technicien5 = new Technicien();
			technicien5.setMatricule("T005");
			technicien5.setNom("Williams");
			technicien5.setPrenom("Robert");
			technicien5.setDateRecrutement(LocalDate.of(2020, 6, 30));
			technicien5.setDateNaissance(LocalDate.of(1988, 12, 5));
			technicien5.setTelephone("3344556677");
			technicien5.setEmail("robert.williams@example.com");
			technicien5.setCin("IJ567890");
			technicien5.setAdresseRue("654 Birch Road");
			technicien5.setAdresseVille("Central City");
			technicien5.setAdresseRegion("Texas");
			technicien5.setAdresseCodePostal("75001");
			technicien5.setSituationFamiliale("Widowed");
			technicien5.setFonction("Technician");

			// Enregistrement des techniciens dans la base de données
			technicienRepository.save(technicien2);
			technicienRepository.save(technicien3);
			technicienRepository.save(technicien4);
			technicienRepository.save(technicien5);

			// Create and save Projet entities
			Projet projet1 = new Projet();
			projet1.setNom("Project A");
			projet1.setEmplacement("Location 1");
			projet1.setDateDebut(LocalDate.of(2024, 1, 1));
			projet1.setDateFin(LocalDate.of(2024, 12, 31));
			projet1.setResponsable("Alice");
			projet1.setEtat("En cours");
			projet1.setCommentaire("Project A details");

			Projet projet2 = new Projet();
			projet2.setNom("Project B");
			projet2.setEmplacement("Location 2");
			projet2.setDateDebut(LocalDate.of(2024, 3, 1));
			projet2.setDateFin(LocalDate.of(2024, 9, 30));
			projet2.setResponsable("Bob");
			projet2.setEtat("Annulé");
			projet2.setCommentaire("Project B details");

			Projet projet3 = new Projet();
			projet3.setNom("Project C");
			projet3.setEmplacement("Location 3");
			projet3.setDateDebut(LocalDate.of(2024, 5, 1));
			projet3.setDateFin(LocalDate.of(2024, 11, 30));
			projet3.setResponsable("Charlie");
			projet3.setEtat("En cours");
			projet3.setCommentaire("Project C details");

			projetRepository.save(projet1);
			projetRepository.save(projet2);
			projetRepository.save(projet3);

			// Optionally assign technicien2 to both projects
			projet1.setTechniciens(List.of(technicien2));
			projet2.setTechniciens(List.of(technicien2));
			projetRepository.save(projet1);
			projetRepository.save(projet2);
		};
	}
}
