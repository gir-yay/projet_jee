package ma.ensa.project_jee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ma.ensa.project_jee.model.Note;

public interface NoteRepository  extends JpaRepository<Note, Integer>{

    
    @Query("SELECT n FROM notes n WHERE n.etudiant.id = :etudiantId AND n.matiere.module.numSemestre = :numSemestre")
    List<Note> findByEtudiantIdByNumSemestre(int etudiantId, int numSemestre);
}