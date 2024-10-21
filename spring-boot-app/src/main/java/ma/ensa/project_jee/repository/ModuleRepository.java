package ma.ensa.project_jee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensa.project_jee.model.Module;
import java.util.List;
public interface ModuleRepository  extends JpaRepository<Module, Integer>{

    List<Module> findByFormationIdAndNumSemestre(int formationId, int numSemestre);
}