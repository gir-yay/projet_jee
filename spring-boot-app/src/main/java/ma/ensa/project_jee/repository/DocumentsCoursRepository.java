package ma.ensa.project_jee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensa.project_jee.model.DocumentsCours;

public interface DocumentsCoursRepository  extends JpaRepository<DocumentsCours, Integer>{

    
}