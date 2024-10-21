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
public class CoursDto {
    
    private int id;
    @NotBlank(message = "Le nom du cours est obligatoire.")
    @Size(max = 50, message = "Le nom du cours est trop long.")
    private String nom;
    @NotNull(message = "L'identifiant de la matière est obligatoire.")
    private int matiereId;
}
