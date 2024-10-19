package ma.ensa.project_jee.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensa.project_jee.model.Enseignant;

public interface EnseignantRepository  extends JpaRepository<Enseignant, Integer>{

        Optional<Enseignant> findByEmail(String email);

}