package ma.ensa.project_jee.mapper;

import org.springframework.stereotype.Service;

import ma.ensa.project_jee.dto.CoursDto;
import ma.ensa.project_jee.model.Cours;

@Service
public class CoursMapper {
    
    public CoursDto toCoursDto(Cours cours) {
        CoursDto coursDto = new CoursDto();
        coursDto.setId(cours.getId());
        coursDto.setNom(cours.getNom());
        coursDto.setMatiereId(cours.getMatiere().getId());
        return coursDto;
    }

    public Cours toCoursEntity(CoursDto coursDto) {
        Cours cours = new Cours();
        cours.setId(coursDto.getId());
        cours.setNom(coursDto.getNom());
        return cours;
    }
}
