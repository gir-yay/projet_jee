package ma.ensa.project_jee.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.dto.ModuleDto;
import ma.ensa.project_jee.mapper.ModuleMapper;
import ma.ensa.project_jee.model.Formation;
import ma.ensa.project_jee.model.Module;
import ma.ensa.project_jee.repository.FormationRepository;
import ma.ensa.project_jee.repository.ModuleRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModuleService {

    private final ModuleRepository moduleRepository;
    private final FormationRepository formationRepository;
    private final ModuleMapper moduleMapper;

    public List<ModuleDto> getModules() {
        List<Module> modules = moduleRepository.findAll();
        List<ModuleDto> moduleDtos = new ArrayList<>();
        moduleDtos = modules.stream().map(e -> moduleMapper.toModuleDto(e))
                .collect(Collectors.toList());

        return moduleDtos;
    }

    public ModuleDto getModule(int id) {
        Optional<Module> moduleExists = moduleRepository.findById(id);
        if (!moduleExists.isPresent()) {
            return null;
        }
        return moduleMapper.toModuleDto(moduleExists.get());
    }

    public List<ModuleDto> getModulesByFormationIdAndNumSemestre(int formationId, int numSemestre) {

        List<Module> module = moduleRepository.findByFormationIdAndNumSemestre(formationId, numSemestre);
        return module.stream().map(e -> moduleMapper.toModuleDto(e)).collect(Collectors.toList());
    }

    public String ajouterModule(ModuleDto moduleDto) {

        Formation formation = formationRepository.findById(moduleDto.getFormationId()).orElse(null);
        if (formation == null) {
            return "Formation n'existe pas.";
        }
        Module module = moduleMapper.toModuleEntity(moduleDto);
        module.setFormation(formation);
        moduleRepository.save(module);
        return null;
    }

    public String modifierModule(ModuleDto moduleDto, int id) {

        Module module = moduleRepository.findById(id).orElse(null);
        if (module == null) {
            return "Module n'existe pas.";
        }
        Formation formation = formationRepository.findById(moduleDto.getFormationId()).orElse(null);
        if (formation == null) {
            return "Formation n'existe pas.";
        }

        module.setNom(moduleDto.getNom());
        module.setNumSemestre(moduleDto.getSemestre());
        module.setFormation(formation);
        moduleRepository.save(module);
        return null;
    }

    public void supprimerModule(int id) {
        moduleRepository.deleteById(id);
    }
}
