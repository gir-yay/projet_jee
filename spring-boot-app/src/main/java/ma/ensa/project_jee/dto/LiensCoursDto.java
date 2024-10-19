package ma.ensa.project_jee.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LiensCoursDto {
    
    private int id;
    @NotNull(message = "Le lien du document est obligatoire.")
    @Size(max = 1000, message = "La taille de lien est trop long.")
    private String  lien;
    @NotNull(message = "L'identifiant du cours est obligatoire.")
    private int cours_id;

}
