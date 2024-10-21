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
public class DocumentsCoursDto {
    
    private int id;
    @NotBlank(message = "Le nom du document est obligatoire.")
    @Size(max = 50, message = "Le nom du document est trop long.")
    private String  nom;
    @NotNull(message = "L'identifiant du cours est obligatoire.")
    private int coursId;

}
