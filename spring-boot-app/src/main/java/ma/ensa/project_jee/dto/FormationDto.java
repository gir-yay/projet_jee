package ma.ensa.project_jee.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormationDto {
    private int id;
    @NotNull(message = "Le nom de la formation est obligatoire.")
    @Size(max=70, message = "Le nom de la formation est trop long.")
    private String nom;
    @NotNull(message = "Le nombre de semestres est obligatoire.")
    private int nbrSemestres;
}
