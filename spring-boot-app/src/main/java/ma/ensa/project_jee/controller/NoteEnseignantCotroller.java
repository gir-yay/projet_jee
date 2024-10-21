package ma.ensa.project_jee.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.service.NoteEnseignantService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/enseignant/notes")
public class NoteEnseignantCotroller {

    private final NoteEnseignantService noteService;

    
    @GetMapping("/test")
    public String test() {
        return "test";
    }
    @PostMapping("/ajouter")
    public ResponseEntity<Map<String, String>> ajouter(@RequestParam("file") MultipartFile file,
            @RequestPart("matiereId") String matiereId) {
        Map<String, String> response = new HashMap<>();
        int matiere_Id = Integer.parseInt(matiereId);
        if (matiere_Id == 0) {
            response.put("status", "error");
            response.put("message", "L'id de la matiere est obligatoire.");
            return ResponseEntity.ok(response);
        }
        String result = noteService.ajouterNotes(file, matiere_Id);
        if(result != null) {
            response.put("status", "error");
            response.put("message", result);
            return ResponseEntity.ok(response);
        }
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
}
