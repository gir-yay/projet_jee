package ma.ensa.project_jee.service;

import org.springframework.stereotype.Service;
import java.util.List;

import lombok.RequiredArgsConstructor;

import ma.ensa.project_jee.model.NoteResponse;

import ma.ensa.project_jee.repository.NoteRepository;

@RequiredArgsConstructor
@Service
public class NoteEtudiantService {

    private final NoteRepository noteRepository;

    public List<NoteResponse> getNotes(int etudiantId, int numSemestre) {
        return noteRepository.findByEtudiantIdByNumSemestre(etudiantId, numSemestre).stream().map(e -> new NoteResponse(e.getMatiere().getNom(),
                e.getValue())).toList();
    }

}