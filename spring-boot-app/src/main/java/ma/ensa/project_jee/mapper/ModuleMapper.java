package ma.ensa.project_jee.mapper;

import org.springframework.stereotype.Service;

import ma.ensa.project_jee.dto.ModuleDto;
import ma.ensa.project_jee.model.Module;

@Service
public class ModuleMapper {
    
    public ModuleDto toModuleDto(Module module) {
        ModuleDto moduleDto = new ModuleDto();
        moduleDto.setId(module.getId());
        moduleDto.setNom(module.getNom());
        moduleDto.setSemestre(module.getNumSemestre());
        moduleDto.setFormationId(module.getFormation().getId());
        return moduleDto;
    }

    public Module toModuleEntity(ModuleDto moduleDto) {
        Module module = new Module();
        module.setId(moduleDto.getId());
        module.setNom(moduleDto.getNom());
        module.setNumSemestre(moduleDto.getSemestre());
        return module;
    }
}
