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
import ma.ensa.project_jee.dto.MatiereDto;
import ma.ensa.project_jee.service.MatiereService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@RestController
@RequestMapping("/directeur/matiere")
public class MatiereController {
    
    private final MatiereService matiereService;

    @GetMapping("")
    public List<MatiereDto> getAll(){
        return matiereService.getMatieres();
    }

    @GetMapping("/{id}")
    public MatiereDto get(@PathVariable int id){
        return matiereService.getMatiere(id);
    }

    @PostMapping("/ajouter")
    public ResponseEntity<Map<String, Object>> ajouter(@Valid @RequestBody MatiereDto matiereDto, BindingResult bindingResult){
        Map<String, Object> response = new HashMap<>();
        if(bindingResult.hasErrors()){
            response.put("status", "error");
            List<String> errors = bindingResult.getAllErrors().stream().map(e->e.getDefaultMessage())
            .collect(Collectors.toList());
            response.put("message", errors);
            return ResponseEntity.ok(response);
        }
        String result = matiereService.ajouterMatiere(matiereDto);
        if(result != null){
            response.put("status", "error");
            response.put("message", result);
            return ResponseEntity.ok(response);
        }
        
        response.put("status", "success");
        return ResponseEntity.ok(response);

    }

    @PostMapping("/modifier/{id}")
    public ResponseEntity<Map<String, Object>> modifier(@Valid @RequestBody MatiereDto matiereDto, BindingResult bindingResult, @PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        if(bindingResult.hasErrors()){
            response.put("status", "error");
            List<String> errors = bindingResult.getAllErrors().stream().map(e->e.getDefaultMessage())
            .collect(Collectors.toList());
            response.put("message", errors);
            return ResponseEntity.ok(response);
        }
        String result = matiereService.modifierMatiere(matiereDto, id);
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
        matiereService.supprimerMatiere(id);
    }
}
