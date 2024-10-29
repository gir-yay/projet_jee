package ma.ensa.project_jee.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.dto.LiensCoursDto;
import ma.ensa.project_jee.mapper.LiensCoursMapper;
import ma.ensa.project_jee.model.Cours;
import ma.ensa.project_jee.model.Utilisateur;
import ma.ensa.project_jee.model.LiensCours;
import ma.ensa.project_jee.repository.CoursRepository;
import ma.ensa.project_jee.repository.LiensCoursRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LiensCoursService {

    private final LiensCoursRepository liensCoursRepository;
    private final CoursRepository coursRepository;
    private final LiensCoursMapper liensCoursMapper;

    private int getEnsId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth.getPrincipal() instanceof Utilisateur) {
            Utilisateur user = (Utilisateur) auth.getPrincipal();
            return user.getId();
        }
        return 0;
    }

    public List<LiensCoursDto> getCurrentEnseignantLiensCours() {
        List<LiensCours> liensCours = liensCoursRepository.findByCoursByMatiereByEnseignant(getEnsId());
        List<LiensCoursDto> liensCoursDtos = new ArrayList<>();
        liensCoursDtos = liensCours.stream().map(e -> liensCoursMapper.toLiensCoursDto(e))
                .collect(Collectors.toList());

        return liensCoursDtos;
    }

    public LiensCoursDto getLiensCours(int id) {

        Optional<LiensCours> liensCoursExists = liensCoursRepository.findById(id);
        if (!liensCoursExists.isPresent()) {
            return null;
        }
        if (liensCoursExists.get().getCours().getMatiere().getEnseignant().getId() != getEnsId()) {
            return null;
        }
        return liensCoursMapper.toLiensCoursDto(liensCoursExists.get());
    }

    public List<LiensCoursDto> getLiensCoursByCoursId(int id) {
        return liensCoursRepository.findByCoursId(id).stream().map(e -> liensCoursMapper.toLiensCoursDto(e))
                .collect(java.util.stream.Collectors.toList());
    }

    public String ajouterLiensCours(LiensCoursDto liensCoursDto) {

        Cours cours = coursRepository.findById(liensCoursDto.getCoursId()).orElse(null);
        if (cours == null) {
            return "Cours n'existe pas.";
        }
        if (cours.getMatiere().getEnseignant().getId() != getEnsId()) {
            return "Vous n'etes pas autorisé à ajouter un lien à ce cours.";
        }
        LiensCours liensCours = liensCoursMapper.toLiensCoursEntity(liensCoursDto);
        liensCours.setCours(cours);
        liensCoursRepository.save(liensCours);
        return null;
    }

    public String modifierLiensCours(LiensCoursDto liensCoursDto, int id) {

        LiensCours liensCours = liensCoursRepository.findById(id).orElse(null);
        if (liensCours == null) {
            return "Lien n'existe pas.";
        }
        if (liensCours.getCours().getMatiere().getEnseignant().getId() != getEnsId()) {
            return "Vous n'etes pas autorisé à modifier ce lien.";
        }
        Cours cours = coursRepository.findById(liensCoursDto.getCoursId()).orElse(null);
        if (cours == null) {
            return "Cours n'existe pas.";
        }

        if (cours.getMatiere().getEnseignant().getId() != getEnsId()) {
            return "Vous n'etes pas autorisé à modifier un lien à ce cours.";
        }

        liensCours.setLien(liensCoursDto.getLien());
        liensCours.setCours(cours);
        liensCoursRepository.save(liensCours);
        return null;
    }

    public void supprimerLiensCours(int id) {
        Optional<LiensCours> liensCoursExists = liensCoursRepository.findById(id);
        if (liensCoursExists.isPresent()
                && liensCoursExists.get().getCours().getMatiere().getEnseignant().getId() == getEnsId()) {
            liensCoursRepository.deleteById(id);
        }
    }
}
