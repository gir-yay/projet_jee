package ma.ensa.project_jee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensa.project_jee.model.Formation;

public interface FormationRepository  extends JpaRepository<Formation, Integer>{

    
}