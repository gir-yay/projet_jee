package ma.ensa.project_jee.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.dto.ArchiverDto;
import ma.ensa.project_jee.dto.MatiereDto;
import ma.ensa.project_jee.dto.UtilisatuerDto;
import ma.ensa.project_jee.service.MatiereService;
import ma.ensa.project_jee.service.UtilisateurService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/directeur/utilisateur")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;
    private final MatiereService matiereService;


    @GetMapping("/directeurs")
    public List<UtilisatuerDto> getDirecteurs() {
        return utilisateurService.getAllDirecteurs();
    }

    @GetMapping("/etudiants")
    public List<UtilisatuerDto> getEtudiants() {
        return utilisateurService.getAllEtudiants();
    }

    @GetMapping("/enseignants")
    public List<UtilisatuerDto> getEnseignants() {
        return utilisateurService.getAllEnseignants();
    }

     @GetMapping("/enseignants/{id}/matiere")
    public List<MatiereDto> getMatieresByEnseignant(@PathVariable int id) {
        return matiereService.getMatieresByEnseignant(id);
    }

    @PostMapping("/ajouter")
    public ResponseEntity<Map<String, String>> ajouter(@RequestParam("file") MultipartFile file,
            @RequestPart String type) {
        Map<String, String> response = new HashMap<>();
        if (type == null) {
            response.put("status", "error");
            response.put("message", "Le type d'utilisateur est obligatoire.");
            return ResponseEntity.ok(response);
        }
        switch (type) {
            case "enseignant": {
                String result = utilisateurService.ajouterEnseignant(file);
                if (result != null) {
                    response.put("status", "error");
                    response.put("message", result);
                } else
                    response.put("status", "success");
                return ResponseEntity.ok(response);
            }
            case "etudiant": {
                String result = utilisateurService.ajouterEtudiant(file);
                if (result != null) {
                    response.put("status", "error");
                    response.put("message", result);
                } else
                    response.put("status", "success");
                return ResponseEntity.ok(response);
            }
            case "directeur": {
                String result = utilisateurService.ajouterDirecteur(file);
                if (result != null) {
                    response.put("status", "error");
                    response.put("message", result);
                } else
                    response.put("status", "success");
                return ResponseEntity.ok(response);
            }
            default: {
                response.put("status", "error");
                response.put("message", "Type d'utilisateur invalide.");
                return ResponseEntity.ok(response);
            }

        }

    }

    @PostMapping("/archiver")
    public Map<String, Object> archiver(@Valid @RequestBody ArchiverDto archiverDto, BindingResult bindingResult) {
        Map<String, Object> response = new HashMap<>();
        if (bindingResult.hasErrors()) {
            response.put("status", "error");
            List<String> errors = bindingResult.getAllErrors().stream().map(e -> e.getDefaultMessage())
                    .collect(Collectors.toList());
            response.put("message", errors);
            return response;
        }
        String type = archiverDto.getType();
        switch (type) {
            case "enseignant": {
                String result = utilisateurService.archiverEnseignat(archiverDto.getId());
                if (result != null) {
                    response.put("status", "error");
                    response.put("message", result);
                } else
                    response.put("status", "success");
                return response;
            }
            case "etudiant": {
                String result = utilisateurService.archiverEtudiant(archiverDto.getId());
                if (result != null) {
                    response.put("status", "error");
                    response.put("message", result);
                } else
                    response.put("status", "success");
                return response;
            }
            case "directeur": {
                String result = utilisateurService.archiverDirecteur(archiverDto.getId());
                if (result != null) {
                    response.put("status", "error");
                    response.put("message", result);
                } else
                    response.put("status", "success");
                return response;
            }
            default: {
                response.put("status", "error");
                response.put("message", "Type d'utilisateur invalide.");
                return response;

            }
        }

    }
}
