package ma.ensa.project_jee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import ma.ensa.project_jee.model.LiensCours;

public interface LiensCoursRepository  extends JpaRepository<LiensCours, Integer>{

    @Query("SELECT l FROM liens_cours l WHERE l.cours.matiere.enseignant.id = :id")
    List<LiensCours> findByCoursByMatiereByEnseignant(@Param("id") int id);

    List<LiensCours> findByCoursId(int coursId);
}