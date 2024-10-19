package ma.ensa.project_jee.mapper;

import org.springframework.stereotype.Service;

import ma.ensa.project_jee.dto.FormationDto;
import ma.ensa.project_jee.model.Formation;

@Service
public class FormationMapper {
    
    public FormationDto toFormationDto(Formation formation){
        FormationDto formationDto = new FormationDto();
        formationDto.setId(formation.getId());
        formationDto.setNom(formation.getNom());
        formationDto.setNbrSemestres(formation.getNbrSemestres());
        return formationDto;
    }

    public Formation toFormationEntity(FormationDto formationDto){
        Formation formation = new Formation();
        formation.setId(formationDto.getId());
        formation.setNom(formationDto.getNom());
        formation.setNbrSemestres(formationDto.getNbrSemestres());
        return formation;
    }
}
