package ma.ensa.project_jee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ma.ensa.project_jee.model.DocumentsCours;
import java.util.List;
public interface DocumentsCoursRepository extends JpaRepository<DocumentsCours, Integer> {


    List<DocumentsCours> findByCoursId(int coursId);
}