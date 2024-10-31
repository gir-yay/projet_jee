package ma.ensa.project_jee.auth;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

  private final AuthenticationService service;




  @PostMapping("/login")
  public ResponseEntity<?> authenticate(
      @Valid @RequestBody AuthenticationRequest request, BindingResult bindingResult) {
      if(bindingResult.hasErrors()){
        Map<String, Object> response = new HashMap<>();
        response.put("status", "error");
        List<String> errors = bindingResult.getAllErrors().stream()
            .map(error -> error.getDefaultMessage())
            .toList();
        response.put("message", errors);
          return  ResponseEntity.ok(response);
      }
      return ResponseEntity.ok(service.authenticate(request));
  }



}
