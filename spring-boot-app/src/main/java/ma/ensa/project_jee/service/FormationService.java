package ma.ensa.project_jee.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.dto.FormationDto;
import ma.ensa.project_jee.mapper.FormationMapper;
import ma.ensa.project_jee.model.Formation;
import ma.ensa.project_jee.repository.FormationRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class FormationService {
    
    private final FormationRepository formationRepository;
    private final FormationMapper formationMapper;

    public List<FormationDto> getFormations(){
        List<Formation> formations = formationRepository.findAll();
        List<FormationDto> formationDtos = new ArrayList<>();
        formationDtos = formations.stream().map(e->formationMapper.toFormationDto(e))
        .collect(Collectors.toList());
        
        return formationDtos;
    }

    public FormationDto getFormation(int id){
        Optional<Formation> formationExists = formationRepository.findById(id);
        if(!formationExists.isPresent()){
            return null;
        }
        return formationMapper.toFormationDto(formationExists.get());
    }

    public String ajouterFormation(FormationDto formationDto){

        Formation formationNomExists =  formationRepository.findByNom(formationDto.getNom()).orElse(null);
        if(formationNomExists != null){
            return "Formation existe déjà.";
        }
        Formation formation = new Formation();
        formation.setNom(formationDto.getNom());
        formation.setNbrSemestres(formationDto.getNbrSemestres());
        formationRepository.save(formation);
        return null;
    }

    public String modifierFormation(FormationDto formationDto, int id){
        Optional<Formation> formationExists = formationRepository.findById(id);
        if(!formationExists.isPresent()){
            return "Formation n'existe pas.";
        }

        Formation formationNomExists =  formationRepository.findByNom(formationDto.getNom()).orElse(null);
        if(formationNomExists != null && formationExists.get().getId() != id){
            return "Formation existe déjà.";
        }
        Formation formation =  formationExists.get();
        formation.setNom(formationDto.getNom());
        formation.setNbrSemestres(formationDto.getNbrSemestres());
        formationRepository.save(formation);
        return null;
    }

    public void supprimerFormation(int id){
        formationRepository.deleteById(id);
    }
}
