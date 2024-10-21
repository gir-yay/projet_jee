package ma.ensa.project_jee.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.dto.CoursDto;
import ma.ensa.project_jee.mapper.CoursMapper;
import ma.ensa.project_jee.model.Matiere;
import ma.ensa.project_jee.model.Utilisateur;
import ma.ensa.project_jee.model.Cours;
import ma.ensa.project_jee.repository.MatiereRepository;
import ma.ensa.project_jee.repository.CoursRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CoursService {

    private final CoursRepository coursRepository;
    private final MatiereRepository matiereRepository;
    private final CoursMapper coursMapper;



  private int getEnsId(){
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth.getPrincipal() instanceof Utilisateur) {
      Utilisateur user = (Utilisateur) auth.getPrincipal();
      System.out.println("\n\n\nEnsId=" + user.getId() + "\n\n\n");
       return user.getId();
    }
    return 0;
  }

    public List<CoursDto> getCurrentEnseignantCours() {
        List<Cours> cours = coursRepository.findByMatiereByEnseignant(getEnsId());
        List<CoursDto> coursDtos = new ArrayList<>();
        coursDtos = cours.stream().map(e -> coursMapper.toCoursDto(e))
                .collect(Collectors.toList());

        return coursDtos;
    }

    public CoursDto getCours(int id) {

        Optional<Cours> coursExists = coursRepository.findById(id);
        if (!coursExists.isPresent()) {
            return null;
        }
        if (coursExists.get().getMatiere().getEnseignant().getId() != getEnsId()) {
            return null;
        }
        return coursMapper.toCoursDto(coursExists.get());
    }

    public List<CoursDto> getMatiereCours(int matiereId) {
        List<Cours> cours = coursRepository.findByMatiereId(matiereId);
        List<CoursDto> coursDtos = new ArrayList<>();
        coursDtos = cours.stream().map(e -> coursMapper.toCoursDto(e))
                .collect(Collectors.toList());

        return coursDtos;
    }
    public String ajouterCours(CoursDto coursDto) {

        Matiere matiere = matiereRepository.findById(coursDto.getMatiereId()).orElse(null);
        if (matiere == null) {
            return "Matiere n'existe pas.";
        }
        if(matiere.getEnseignant().getId() != getEnsId()){
            return "Vous n'etes pas autorisé à ajouter un cours à cette matiere.";
        }
        Cours cours = coursMapper.toCoursEntity(coursDto);
        cours.setMatiere(matiere);
        coursRepository.save(cours);
        return null;
    }

    public String modifierCours(CoursDto coursDto, int id) {

        Cours cours = coursRepository.findById(id).orElse(null);
        if (cours == null) {
            return "Cours n'existe pas.";
        }
        Matiere matiere = matiereRepository.findById(coursDto.getMatiereId()).orElse(null);
        if (matiere == null) {
            return "Matiere n'existe pas.";
        }

        if(matiere.getEnseignant().getId() != getEnsId()){
            return "Vous n'etes pas autorisé à modifier un cours à cette matiere.";
        }

        cours.setNom(coursDto.getNom());
        cours.setMatiere(matiere);
        coursRepository.save(cours);
        return null;
    }

    public void supprimerCours(int id) {
        Optional<Cours> coursExists = coursRepository.findById(id);
        if(coursExists.isPresent() && coursExists.get().getMatiere().getEnseignant().getId() == getEnsId()){
            coursRepository.deleteById(id);
        }
    }
}
