package ma.ensa.project_jee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensa.project_jee.model.Cours;

public interface CoursRepository  extends JpaRepository<Cours, Integer>{

    
}