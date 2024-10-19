package ma.ensa.project_jee.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensa.project_jee.model.Formation;

public interface FormationRepository  extends JpaRepository<Formation, Integer>{

    Optional<Formation> findByNom(String nom);
    
}