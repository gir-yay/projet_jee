package ma.ensa.project_jee.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ BadCredentialsException.class, DisabledException.class })
    public ResponseEntity<Map<String, String>> handleLoginExceptions(Exception e) {
        Map<String, String> response = new HashMap<>();
        response.put("status", "error");
        if (e instanceof BadCredentialsException) {
            response.put("message", "Email ou mot de passe incorrect");
        }
        else{
            response.put("message", "Compte désactivé");
        }
        return ResponseEntity.ok(response);
    }


}
