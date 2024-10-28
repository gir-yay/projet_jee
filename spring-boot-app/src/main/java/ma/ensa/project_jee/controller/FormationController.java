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
import ma.ensa.project_jee.dto.FormationDto;
import ma.ensa.project_jee.dto.ModuleDto;
import ma.ensa.project_jee.service.FormationService;
import ma.ensa.project_jee.service.ModuleService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@RestController
@RequestMapping("/directeur/formation")
public class FormationController {
    
    private final FormationService formationService;
    private final ModuleService moduleService;

    @GetMapping("")
    public List<FormationDto> getAll(){
        return formationService.getFormations();
    }

    @GetMapping("/{id}")
    public FormationDto get(@PathVariable int id){
        return formationService.getFormation(id);
    }

    @PostMapping("/ajouter")
    public ResponseEntity<Map<String, Object>> ajouter(@Valid @RequestBody FormationDto formationDto, BindingResult bindingResult){
        Map<String, Object> response = new HashMap<>();
        if(bindingResult.hasErrors()){
            response.put("status", "error");
            List<String> errors = bindingResult.getAllErrors().stream().map(e->e.getDefaultMessage())
            .collect(Collectors.toList());
            response.put("message", errors);
            return ResponseEntity.ok(response);
        }
        String result = formationService.ajouterFormation(formationDto);
        if(result != null){
            response.put("status", "error");
            response.put("message", result);
            return ResponseEntity.ok(response);
        }
        
        response.put("status", "success");
        return ResponseEntity.ok(response);

    }

    @PostMapping("/modifier/{id}")
    public ResponseEntity<Map<String, Object>> modifier(@Valid @RequestBody FormationDto formationDto, BindingResult bindingResult, @PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        if(bindingResult.hasErrors()){
            response.put("status", "error");
            List<String> errors = bindingResult.getAllErrors().stream().map(e->e.getDefaultMessage())
            .collect(Collectors.toList());
            response.put("message", errors);
            return ResponseEntity.ok(response);
        }
        String result = formationService.modifierFormation(formationDto, id);
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
        formationService.supprimerFormation(id);
    }

    @GetMapping("/{id}/modules")
    public List<ModuleDto> getModules(@PathVariable int id){
        return moduleService.getModulesByFormationId(id);
    }
}
