package ma.ensa.project_jee.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.dto.DocumentsCoursDto;
import ma.ensa.project_jee.service.DocumentsCoursService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@RestController
@RequestMapping("/enseignant/cours/documents")
public class DocumentsCoursController {
    
    private final DocumentsCoursService documentsCoursService;



    @GetMapping("/{id}")
    public DocumentsCoursDto get(@PathVariable int id){
        return documentsCoursService.getDocumentsCours(id);
    }

    @PostMapping("/ajouter")
    public ResponseEntity<Map<String, Object>> ajouter(@Valid @RequestPart("data") DocumentsCoursDto documentsCoursDto, BindingResult bindingResult,
    @RequestParam("file") MultipartFile file){
        Map<String, Object> response = new HashMap<>();
        if(bindingResult.hasErrors()){
            response.put("status", "error");
            List<String> errors = bindingResult.getAllErrors().stream().map(e->e.getDefaultMessage())
            .collect(Collectors.toList());
            response.put("message", errors);
            return ResponseEntity.ok(response);
        }
        String result = documentsCoursService.ajouterDocumentsCours(documentsCoursDto, file);
        if(result != null){
            response.put("status", "error");
            response.put("message", result);
            return ResponseEntity.ok(response);
        }
        
        response.put("status", "success");
        return ResponseEntity.ok(response);

    }

    @PostMapping("/modifier/{id}")
    public ResponseEntity<Map<String, Object>> modifier(@Valid @RequestPart("data") DocumentsCoursDto documentsCoursDto, BindingResult bindingResult,
    @RequestParam(name = "file", required = false) MultipartFile file, @PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        if(bindingResult.hasErrors()){
            response.put("status", "error");
            List<String> errors = bindingResult.getAllErrors().stream().map(e->e.getDefaultMessage())
            .collect(Collectors.toList());
            response.put("message", errors);
            return ResponseEntity.ok(response);
        }
        String result = documentsCoursService.modifierDocumentsCours(documentsCoursDto, file, id);
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
        documentsCoursService.supprimerDocumentsCours(id);
    }

    @PostMapping("/download/{id}")
    public ResponseEntity<byte[]>  download(@PathVariable int id){
        return documentsCoursService.downloadDocument(id);
    }
}
