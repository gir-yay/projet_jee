package ma.ensa.project_jee.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.dto.CoursDto;
import ma.ensa.project_jee.dto.MatiereDto;
import ma.ensa.project_jee.model.Enseignant;
import ma.ensa.project_jee.service.CoursService;
import ma.ensa.project_jee.service.MatiereService;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/enseignant/matiere")
public class MatiereEnseignantController {
    
    private final MatiereService matiereService;
    private final CoursService coursService;

    @GetMapping
    public List<MatiereDto> getMatieres() {
        Enseignant enseignant = (Enseignant) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
        return matiereService.getMatieresByEnseignant(enseignant.getId());
    }

    @GetMapping("/{id}")
    public MatiereDto getMatieres(@PathVariable int id) {
        return matiereService.getMatiere(id);
    }


    @GetMapping("/{id}/cours")
    public List<CoursDto> getCours(@PathVariable int id) {

        return coursService.getMatiereCours(id);
    }

}

