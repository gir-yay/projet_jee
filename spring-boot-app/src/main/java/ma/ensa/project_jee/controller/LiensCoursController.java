package ma.ensa.project_jee.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.dto.LiensCoursDto;
import ma.ensa.project_jee.service.LiensCoursService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@RestController
@RequestMapping("/enseignant/cours/liens")
public class LiensCoursController {
    
    private final LiensCoursService liensCoursService;

    @GetMapping("")
    public List<LiensCoursDto> getAll(){
        return liensCoursService.getCurrentEnseignantLiensCours();
    }

    @GetMapping("/{id}")
    public LiensCoursDto get(@PathVariable int id){
        return liensCoursService.getLiensCours(id);
    }

    @PostMapping("/ajouter")
    public ResponseEntity<Map<String, Object>> ajouter(@Valid @RequestBody LiensCoursDto liensCoursDto, BindingResult bindingResult){
        Map<String, Object> response = new HashMap<>();
        if(bindingResult.hasErrors()){
            response.put("status", "error");
            List<String> errors = bindingResult.getAllErrors().stream().map(e->e.getDefaultMessage())
            .collect(Collectors.toList());
            response.put("message", errors);
            return ResponseEntity.ok(response);
        }
        String result = liensCoursService.ajouterLiensCours(liensCoursDto);
        if(result != null){
            response.put("status", "error");
            response.put("message", result);
            return ResponseEntity.ok(response);
        }
        
        response.put("status", "success");
        return ResponseEntity.ok(response);

    }

    @PostMapping("/modifier/{id}")
    public ResponseEntity<Map<String, Object>> modifier(@Valid @RequestBody LiensCoursDto liensCoursDto, BindingResult bindingResult, @PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        if(bindingResult.hasErrors()){
            response.put("status", "error");
            List<String> errors = bindingResult.getAllErrors().stream().map(e->e.getDefaultMessage())
            .collect(Collectors.toList());
            response.put("message", errors);
            return ResponseEntity.ok(response);
        }
        String result = liensCoursService.modifierLiensCours(liensCoursDto, id);
        if(result != null){
            response.put("status", "error");
            response.put("message", result);
            return ResponseEntity.ok(response);

        }
        
        response.put("status", "success");
        return ResponseEntity.ok(response);

    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable int id){
        liensCoursService.supprimerLiensCours(id);
    }
}
