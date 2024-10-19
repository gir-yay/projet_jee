package ma.ensa.project_jee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensa.project_jee.model.Etudiant;

public interface EtudiantRepository  extends JpaRepository<Etudiant, Integer>{

    
}