package ma.ensa.project_jee.dto;

import org.springframework.web.multipart.MultipartFile;

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
    @NotNull(message = "Le nom du document est obligatoire.")
    @Size(max = 50, message = "Le nom du document est trop long.")
    private String  nom;
    @NotNull(message = "Le document est obligatoire.")
    private MultipartFile document;
    @NotNull(message = "L'identifiant du cours est obligatoire.")
    private int cours_id;

}
