package ma.ensa.project_jee.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatiereDto {
    
    private int id;
    @NotBlank(message = "Le nom de la matière est obligatoire.")
    @Size(max = 50, message = "Le nom de la matière est trop long.")
    private String nom;
    @NotNull(message = "L'identifiant du module est obligatoire.")
    private int moduleId;
    @NotNull(message = "L'identifiant de l'enseignant est obligatoire.")
    private int enseignantId;
}
