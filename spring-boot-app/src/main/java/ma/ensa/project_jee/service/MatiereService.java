package ma.ensa.project_jee.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.dto.MatiereDto;
import ma.ensa.project_jee.mapper.MatiereMapper;
import ma.ensa.project_jee.model.Module;
import ma.ensa.project_jee.model.Enseignant;
import ma.ensa.project_jee.model.Matiere;
import ma.ensa.project_jee.repository.ModuleRepository;
import ma.ensa.project_jee.repository.EnseignantRepository;
import ma.ensa.project_jee.repository.MatiereRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatiereService {

    private final MatiereRepository matiereRepository;
    private final ModuleRepository moduleRepository;
    private final MatiereMapper matiereMapper;
    private final EnseignantRepository enseignantRepository;

    public List<MatiereDto> getMatieres() {
        List<Matiere> matieres = matiereRepository.findAll();
        List<MatiereDto> matiereDtos = new ArrayList<>();
        matiereDtos = matieres.stream().map(e -> matiereMapper.toMatiereDto(e))
                .collect(Collectors.toList());

        return matiereDtos;
    }

    public MatiereDto getMatiere(int id) {
        Optional<Matiere> matiereExists = matiereRepository.findById(id);
        if (!matiereExists.isPresent()) {
            return null;
        }
        return matiereMapper.toMatiereDto(matiereExists.get());
    }

    public List<MatiereDto> getMatieresByModuleId(int moduleId) {
        List<Matiere> matieres = matiereRepository.findByModuleId(moduleId);
        List<MatiereDto> matiereDtos = new ArrayList<>();
        matiereDtos = matieres.stream().map(e -> matiereMapper.toMatiereDto(e))
                .collect(Collectors.toList());

        return matiereDtos;
    }

    public String ajouterMatiere(MatiereDto matiereDto) {

        Module module = moduleRepository.findById(matiereDto.getModuleId()).orElse(null);
        if (module == null) {
            return "Module n'existe pas.";
        }
        Enseignant enseignant = enseignantRepository.findById(matiereDto.getEnseignantId()).orElse(null);
        if(enseignant == null){
            return "Enseignant n'existe pas.";
        }
        Matiere matiere = matiereMapper.toMatiereEntity(matiereDto);
        matiere.setModule(module);
        matiere.setEnseignant(enseignant);
        matiereRepository.save(matiere);
        return null;
    }

    public String modifierMatiere(MatiereDto matiereDto, int id) {

        Matiere matiere = matiereRepository.findById(id).orElse(null);
        if (matiere == null) {
            return "Matiere n'existe pas.";
        }
        Module module = moduleRepository.findById(matiereDto.getModuleId()).orElse(null);
        if (module == null) {
            return "Module n'existe pas.";
        }
        Enseignant enseignant = enseignantRepository.findById(matiereDto.getEnseignantId()).orElse(null);
        if(enseignant == null){
            return "Enseignant n'existe pas.";
        }

        matiere.setNom(matiereDto.getNom());
        matiere.setModule(module);
        matiere.setEnseignant(enseignant);
        matiereRepository.save(matiere);
        return null;
    }

    public void supprimerMatiere(int id) {
        matiereRepository.deleteById(id);
    }
}
