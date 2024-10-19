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
public class UserDto {
    
    @Size(max=30, message = "Le nom est trop long.")
    @NotNull(message = "Le type d'utilisateur est obligatoire.")
    private String type;
    @NotNull(message = "Le fichier est obligatoire.")
    private MultipartFile file;
}
