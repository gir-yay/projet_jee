package ma.ensa.project_jee.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensa.project_jee.model.Directeur;

public interface DirecteurRepository  extends JpaRepository<Directeur, Integer>{

    Optional<Directeur> findByEmail(String email);
}