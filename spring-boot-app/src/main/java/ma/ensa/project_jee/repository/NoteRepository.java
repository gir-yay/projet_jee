package ma.ensa.project_jee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensa.project_jee.model.Note;

public interface NoteRepository  extends JpaRepository<Note, Integer>{

    
}