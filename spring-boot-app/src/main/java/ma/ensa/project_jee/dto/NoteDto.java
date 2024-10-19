package ma.ensa.project_jee.dto;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoteDto {
    
    private int id;
    @NotNull(message = "La note est obligatoire.")
    private int value;
    @NotNull(message = "L'identifiant de l'etudiant est obligatoire.")
    private int etudiant_id;
    @NotNull(message = "L'identifiant de la matiere est obligatoire.")
    private int matiere_id;

    
}
