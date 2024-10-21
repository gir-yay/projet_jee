package ma.ensa.project_jee.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
  @JsonProperty("status")
  private String status = "success";
  @JsonProperty("access_token")
  private String accessToken;

  public AuthenticationResponse(String accessToken) {
    this.accessToken = accessToken;

  }

}
