package ma.ensa.project_jee.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import org.springframework.lang.NonNull;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
  private final JWTService jwtService;
  private final UserDetailsService userDetailsService;
  private HttpServletRequest request;


  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain
  ) throws ServletException, IOException {
      final String authHeader = request.getHeader("Authorization");
      final String jwt;
      final String userEmail;
      String role = null;
  
      if (request.getServletPath().contains("/auth")) {
          filterChain.doFilter(request, response);
          return;
      }
  
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
          response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
          return;
      }
  
      jwt = authHeader.substring(7);
      userEmail = jwtService.extractUsername(jwt);
      role = jwtService.extractRole(jwt);
  
      if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
          UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
  
          if (jwtService.isTokenValid(jwt, userDetails)) {
              UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                  userDetails,
                  null,
                  userDetails.getAuthorities()
              );
              authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
              SecurityContextHolder.getContext().setAuthentication(authToken);
          }
      }
  
      boolean accessGranted = false;
  
      switch (role.toLowerCase()) {
          case "directeur":
              accessGranted = request.getServletPath().startsWith("/directeur");
              break;
          case "enseignant":
              accessGranted = request.getServletPath().startsWith("/enseignant");
              break;
          case "etudiant":
              accessGranted = request.getServletPath().startsWith("/etudiant");
              break;
          default:
              break;
      }
  
      if (!accessGranted) {
        System.out.println("\n\n\n Request: " + request.getServletPath() + "\n\n\n");
        System.out.println("\n\n\nRole: " + role + "\n\n\n");

          response.setStatus(HttpServletResponse.SC_FORBIDDEN);
          return;
      }
  
      filterChain.doFilter(request, response);
  }
  
}
