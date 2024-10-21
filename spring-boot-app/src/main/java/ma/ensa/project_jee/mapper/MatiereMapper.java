package ma.ensa.project_jee.mapper;

import org.springframework.stereotype.Service;

import ma.ensa.project_jee.dto.MatiereDto;
import ma.ensa.project_jee.model.Matiere;

@Service
public class MatiereMapper {
    
    public MatiereDto toMatiereDto(Matiere matiere) {
        MatiereDto matiereDto = new MatiereDto();
        matiereDto.setId(matiere.getId());
        matiereDto.setNom(matiere.getNom());
        matiereDto.setModuleId(matiere.getModule().getId());
        matiereDto.setEnseignantId(matiere.getEnseignant().getId());
        return matiereDto;
    }

    public Matiere toMatiereEntity(MatiereDto matiereDto) {
        Matiere matiere = new Matiere();
        matiere.setId(matiereDto.getId());
        matiere.setNom(matiereDto.getNom());
        return matiere;
    }
}
