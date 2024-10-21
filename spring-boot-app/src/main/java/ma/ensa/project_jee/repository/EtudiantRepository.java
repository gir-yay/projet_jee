package ma.ensa.project_jee.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.ensa.project_jee.model.Etudiant;

public interface EtudiantRepository extends JpaRepository<Etudiant, Integer> {

    Optional<Etudiant> findByEmail(String email);
    Etudiant findByNumApogee(int numApogee);

   
}