package ma.ensa.project_jee.mapper;

import org.springframework.stereotype.Service;

import ma.ensa.project_jee.dto.LiensCoursDto;
import ma.ensa.project_jee.model.LiensCours;

@Service
public class LiensCoursMapper {
    
    public LiensCoursDto toLiensCoursDto(LiensCours liensCours) {
        LiensCoursDto liensCoursDto = new LiensCoursDto();
        liensCoursDto.setId(liensCours.getId());
        liensCoursDto.setLien(liensCours.getLien());
        liensCoursDto.setCoursId(liensCours.getCours().getId());
        return liensCoursDto;
    }

    public LiensCours toLiensCoursEntity(LiensCoursDto liensCoursDto) {
        LiensCours liensCours = new LiensCours();
        liensCours.setId(liensCoursDto.getId());
        liensCours.setLien(liensCoursDto.getLien());
        return liensCours;
    }
}
