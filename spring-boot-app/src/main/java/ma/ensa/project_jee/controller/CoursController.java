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
import ma.ensa.project_jee.dto.CoursDto;
import ma.ensa.project_jee.dto.DocumentsCoursDto;
import ma.ensa.project_jee.dto.LiensCoursDto;
import ma.ensa.project_jee.service.CoursService;
import ma.ensa.project_jee.service.DocumentsCoursService;
import ma.ensa.project_jee.service.LiensCoursService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@RestController
@RequestMapping("/enseignant/cours")
public class CoursController {
    
    private final CoursService coursService;
    private final LiensCoursService liensCoursService;
    private final DocumentsCoursService documentsCoursService;

    @GetMapping("")
    public List<CoursDto> getAll(){
        return coursService.getCurrentEnseignantCours();
    }

    @GetMapping("/{id}")
    public CoursDto get(@PathVariable int id){
        return coursService.getCours(id);
    }

    @PostMapping("/ajouter")
    public ResponseEntity<Map<String, Object>> ajouter(@Valid @RequestBody CoursDto coursDto, BindingResult bindingResult){
        Map<String, Object> response = new HashMap<>();
        if(bindingResult.hasErrors()){
            response.put("status", "error");
            List<String> errors = bindingResult.getAllErrors().stream().map(e->e.getDefaultMessage())
            .collect(Collectors.toList());
            response.put("message", errors);
            return ResponseEntity.ok(response);
        }
        String result = coursService.ajouterCours(coursDto);
        if(result != null){
            response.put("status", "error");
            response.put("message", result);
            return ResponseEntity.ok(response);
        }
        
        response.put("status", "success");
        return ResponseEntity.ok(response);

    }

    @PostMapping("/modifier/{id}")
    public ResponseEntity<Map<String, Object>> modifier(@Valid @RequestBody CoursDto coursDto, BindingResult bindingResult, @PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        if(bindingResult.hasErrors()){
            response.put("status", "error");
            List<String> errors = bindingResult.getAllErrors().stream().map(e->e.getDefaultMessage())
            .collect(Collectors.toList());
            response.put("message", errors);
            return ResponseEntity.ok(response);
        }
        String result = coursService.modifierCours(coursDto, id);
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
        coursService.supprimerCours(id);
    }

    @GetMapping("/{id}/liens")
    public List<LiensCoursDto> getLiensCours(@PathVariable int id){
        return liensCoursService.getLiensCoursByCoursId(id);
    }

    @GetMapping("/{id}/documents")
    public List<DocumentsCoursDto> getDocumentsCours(@PathVariable int id){
        return documentsCoursService.getDocumentsByCoursId(id);
    }

}
