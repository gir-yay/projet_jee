package ma.ensa.project_jee.mapper;

import org.springframework.stereotype.Service;

import ma.ensa.project_jee.dto.UtilisatuerDto;
import ma.ensa.project_jee.model.Utilisateur;

@Service
public class UtilisateurMapper {
    
    public UtilisatuerDto toUtilisateurDto(Utilisateur utilisateur){
        UtilisatuerDto utilisateurDto = new UtilisatuerDto();
        utilisateurDto.setId(utilisateur.getId());
        utilisateurDto.setNom(utilisateur.getNom());
        utilisateurDto.setPrenom(utilisateur.getPrenom());
        utilisateurDto.setEmail(utilisateur.getEmail());
        return utilisateurDto;
    }

    public Utilisateur toUtilisateurEntity(UtilisatuerDto utilisateurDto){
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(utilisateurDto.getId());
        utilisateur.setNom(utilisateurDto.getNom());
        utilisateur.setPrenom(utilisateurDto.getPrenom());
        utilisateur.setEmail(utilisateurDto.getEmail());
        return utilisateur;
    }
}
