package ma.ensa.project_jee.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.repository.DirecteurRepository;
import ma.ensa.project_jee.repository.EnseignantRepository;
import ma.ensa.project_jee.repository.EtudiantRepository;
@RequiredArgsConstructor
@Configuration
public class ApplicationConfig {
    private final DirecteurRepository directeurRepository;
    private final EtudiantRepository etudiantRepository;
    private final EnseignantRepository enseignantRepository;
    private final HttpServletRequest request;



    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            String userType = getUserTypeFromSession();

            if ("etudiant".equals(userType)) {
                return etudiantRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            } else if ("enseignant".equals(userType)) {
                return enseignantRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            } else {
                return directeurRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    private String getUserTypeFromSession() {
        return (String) request.getSession().getAttribute("userType");
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


}
