package ma.ensa.project_jee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.ensa.project_jee.model.Cours;
import java.util.List;
public interface CoursRepository  extends JpaRepository<Cours, Integer>{

    @Query("SELECT c FROM cours c WHERE c.matiere.enseignant.id = :id")
    List<Cours> findByMatiereByEnseignant(@Param("id") int id);
    
    
    List<Cours> findByMatiereId(int matiereId);
    
}