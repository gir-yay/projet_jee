package ma.ensa.project_jee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensa.project_jee.model.Matiere;

import java.util.List;
public interface MatiereRepository  extends JpaRepository<Matiere, Integer>{

    List<Matiere> findByModuleId(int moduleId);
    List<Matiere> findByEnseignantId(int enseignantId);

}