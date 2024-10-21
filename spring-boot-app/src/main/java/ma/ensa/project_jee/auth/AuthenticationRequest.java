package ma.ensa.project_jee.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class AuthenticationRequest {

  @Email(message = "Email n'est pas valide.")
  @NotBlank(message = "Email est requis.")
  private String email;
  @NotBlank(message = "Mot de passe est requis.")
  private String password;
  @NotBlank(message = "Type d'utilisateur est requis.")
  private String userType;




}
