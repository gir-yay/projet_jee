package ma.ensa.project_jee.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UtilisatuerDto {
    
    private int id;
    private String nom;
    private String prenom;
    private String email;

}
