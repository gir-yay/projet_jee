package ma.ensa.project_jee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensa.project_jee.model.Enseignant;

public interface EnseignantRepository  extends JpaRepository<Enseignant, Integer>{

    
}