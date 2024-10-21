package ma.ensa.project_jee.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.repository.DirecteurRepository;
import ma.ensa.project_jee.repository.EnseignantRepository;
import ma.ensa.project_jee.repository.EtudiantRepository;
import ma.ensa.project_jee.security.JWTService;

@RequiredArgsConstructor
@Service
public class AuthenticationService {

        private final JWTService jwtService;
        private final AuthenticationManager authenticationManager;
        private final DirecteurRepository directeurRepository;
        private final EnseignantRepository enseignantRepository;
        private final EtudiantRepository etudiantRepository;
        private final HttpServletRequest httpServletRequest;


        public AuthenticationResponse authenticate(AuthenticationRequest request) {

                HttpSession session = httpServletRequest.getSession();
                session.setAttribute("userType", request.getUserType());
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()
                                                ));
                if (request.getUserType().equals("etudiant")) {
                        var user = etudiantRepository.findByEmail(request.getEmail())
                                        .orElseThrow();
                        var jwtToken = jwtService.generateToken(user);
                        return new AuthenticationResponse(jwtToken.toString());
                } else if (request.getUserType().equals("enseignant")) {
                        var user = enseignantRepository.findByEmail(request.getEmail())
                                        .orElseThrow();
                        var jwtToken = jwtService.generateToken(user);
                        return new AuthenticationResponse(jwtToken.toString());
                } else {
                        var user = directeurRepository.findByEmail(request.getEmail())
                                        .orElseThrow();
                        var jwtToken = jwtService.generateToken(user);
                        return new AuthenticationResponse(jwtToken.toString());
                }

        }

        

}
