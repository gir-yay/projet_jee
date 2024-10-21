package ma.ensa.project_jee.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArchiverDto {

    @NotEmpty(message="Le type d'utilisateur est obligatoire.")
    private String type;
    @NotNull(message="L'id d'utilisateur est obligatoire.")
    private int id;
}
