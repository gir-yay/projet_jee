package ma.ensa.project_jee.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import ma.ensa.project_jee.dto.CoursDto;
import ma.ensa.project_jee.dto.DocumentsCoursDto;
import ma.ensa.project_jee.dto.LiensCoursDto;
import ma.ensa.project_jee.dto.MatiereDto;
import ma.ensa.project_jee.dto.ModuleDto;
import ma.ensa.project_jee.model.Etudiant;
import ma.ensa.project_jee.model.Formation;
import ma.ensa.project_jee.model.NoteResponse;
import ma.ensa.project_jee.model.Utilisateur;
import ma.ensa.project_jee.repository.EtudiantRepository;
import ma.ensa.project_jee.repository.FormationRepository;
import ma.ensa.project_jee.service.CoursService;
import ma.ensa.project_jee.service.DocumentsCoursService;
import ma.ensa.project_jee.service.LiensCoursService;
import ma.ensa.project_jee.service.MatiereService;
import ma.ensa.project_jee.service.ModuleService;
import ma.ensa.project_jee.service.NoteEtudiantService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/etudiant")
public class EtudiantController {

    private final ModuleService moduleService;
    private final MatiereService matiereService;
    private final CoursService coursService;;
    private final DocumentsCoursService documentsCoursService;
    private final LiensCoursService liensCoursService;
    private final NoteEtudiantService noteService;
    private final EtudiantRepository etudiantRepository;
    private final FormationRepository formationRepository;

    private Etudiant getCurrentEtudiant() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth.getPrincipal() instanceof Utilisateur) {
            Utilisateur user = (Utilisateur) auth.getPrincipal();
            Etudiant etudiant = etudiantRepository.findById(user.getId()).get();
            return etudiant;
        }
        return null;
    }

    @GetMapping("/modules")
    public List<ModuleDto> getModules() {
        return moduleService.getModulesByFormationIdAndNumSemestre(getCurrentEtudiant().getFormation().getId(),
                getCurrentEtudiant().getNumSemestre());

    }

    @GetMapping("/modules/{id}/matieres")
    public List<MatiereDto> getMatieres(@PathVariable int id) {
        return matiereService.getMatieresByModuleId(id);
    }

    @GetMapping("/modules/matieres/{id}/cours")
    public List<CoursDto> getCours(@PathVariable int id) {
        return coursService.getMatiereCours(id);
    }

    @GetMapping("/modules/matieres/cours/{id}/documents")
    public List<DocumentsCoursDto> getDocuments(@PathVariable int id) {
        return documentsCoursService.getDocumentsByCoursId(id);
    }

    @GetMapping("/modules/matieres/cours/{id}/liens")
    public List<LiensCoursDto> getLiens(@PathVariable int id) {
        return liensCoursService.getLiensCoursByCoursId(id);
    }

    @PostMapping("/modules/matieres/cours/documents/download/{id}")
    public ResponseEntity<byte[]> download(@PathVariable int id) {
        return documentsCoursService.downloadDocument(id);
    }

    @GetMapping("/notes")
    public ResponseEntity<?> getNotesBySemestre(@RequestParam(required = false) Integer s) {
        if (s == null) {
            s = getCurrentEtudiant().getNumSemestre();
        }
        if (!(s <= getCurrentEtudiant().getNumSemestre() && s > 0)) {
            return ResponseEntity.badRequest().body("Nummero de semestre invalide.");
        }

        List<NoteResponse> notes = noteService.getNotes(getCurrentEtudiant().getId(), s);

        
        return ResponseEntity.ok(notes);
    }

}
