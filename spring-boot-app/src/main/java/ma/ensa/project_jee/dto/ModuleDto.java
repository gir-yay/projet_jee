package ma.ensa.project_jee.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModuleDto {
    private int id;
    @NotBlank(message = "Le nom du module est obligatoire.")
    @Size(max = 50, message = "Le nom du module est trop long.")
    private String nom;
    @NotNull(message = "Le numéro de semestre est obligatoire.")
    @Min(value = 1, message = "Le numéro de semestre est invalide.")
    private int semestre;
    @NotNull(message = "L'identifiant de la formation est obligatoire.")
    private int formationId;
}
