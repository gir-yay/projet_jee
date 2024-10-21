package ma.ensa.project_jee.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.stream.Collectors;
import java.util.UUID;
import java.util.List;
import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.dto.DocumentsCoursDto;
import ma.ensa.project_jee.model.Cours;

import ma.ensa.project_jee.model.DocumentsCours;
import ma.ensa.project_jee.model.Utilisateur;
import ma.ensa.project_jee.repository.CoursRepository;
import ma.ensa.project_jee.repository.DocumentsCoursRepository;

import java.util.Optional;

import java.util.Map;
import java.util.HashMap;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class DocumentsCoursService {

    private final DocumentsCoursRepository documentsCoursRepository;
    private final CoursRepository coursRepository;

    @Value("${documents.upload-dir}")
    private String uploadDir;

        private int getEnsId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth.getPrincipal() instanceof Utilisateur) {
            Utilisateur user = (Utilisateur) auth.getPrincipal();
            System.out.println("\n\n\nEnsId=" + user.getId() + "\n\n\n");
            return user.getId();
        }
        return 0;
    }

    public DocumentsCoursDto getDocumentsCours(int id) {

        Optional<DocumentsCours> doumentsCoursExists = documentsCoursRepository.findById(id);
        if (!doumentsCoursExists.isPresent()) {
            return null;
        }
        if (doumentsCoursExists.get().getCours().getMatiere().getEnseignant().getId() != getEnsId()) {
            return null;
        }
        DocumentsCours document = doumentsCoursExists.get();
        return new DocumentsCoursDto(document.getId(), document.getNom(), document.getCours().getId());
    }

    public List<DocumentsCoursDto> getDocumentsByCoursId(int id) {
        return documentsCoursRepository.findByCoursId(id)
                .stream().map(e -> new DocumentsCoursDto(e.getId(), e.getNom(), e.getCours().getId()))
                .collect(Collectors.toList());
    }

    public ResponseEntity<byte[]> downloadDocument(int id) {
        Optional<DocumentsCours> documentsCoursExists = documentsCoursRepository.findById(id);


        DocumentsCours document = documentsCoursExists.get();
        String docPath = document.getChemin();
        String ext = docPath.substring(docPath.lastIndexOf(".") + 1);
        Path filePath = Paths.get(uploadDir).resolve(docPath);

        try {
            byte[] fileContent = Files.readAllBytes(filePath);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getNom() + "." + ext + "\"");
            return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public String ajouterDocumentsCours(DocumentsCoursDto documentsCoursDto, MultipartFile file) {

        String filename = file.getOriginalFilename().toLowerCase();
        if (filename == "") {
            return "Le document de cours est obligatoire.";
        }
        Cours cours = coursRepository.findById(documentsCoursDto.getCoursId()).orElse(null);
        if (cours == null) {
            return "Cours n'existe pas.";
        }
        if (cours.getMatiere().getEnseignant().getId() != getEnsId()) {
            return "Vous n'etes pas autorisé à ajouter un document à ce cours.";
        }
        Map<String, String> response = storeDocument(file);

        if (response.get("status").equals("error"))
            return response.get("message");
        DocumentsCours documentsCours = new DocumentsCours();
        documentsCours.setNom(documentsCoursDto.getNom());
        documentsCours.setCours(cours);
        documentsCours.setChemin(response.get("path"));
        documentsCoursRepository.save(documentsCours);
        return null;
    }

    public Map<String, String> storeDocument(MultipartFile file) {
        Map<String, String> response = new HashMap<>();
        String filename = file.getOriginalFilename().toLowerCase();
        String ext = filename.substring(filename.lastIndexOf(".") + 1);

        String savedFileName = filename.substring(0, filename.lastIndexOf("."))
                + UUID.randomUUID().toString().substring(0, 8) + "." +
                ext;

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath))
                Files.createDirectories(uploadPath);
            Path filePath = uploadPath.resolve(savedFileName);
            Files.copy(file.getInputStream(), filePath);
            response.put("status", "success");
            response.put("path", savedFileName);
        } catch (IOException e) {
            response.put("status", "error");
            response.put("message", "Erreur lors de l'enregistrement du document.");

        }
        return response;
    }

    public void deleteDocument(String chemin) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(chemin);
            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public String modifierDocumentsCours(DocumentsCoursDto documentsCoursDto, MultipartFile file, int id) {

        Optional<DocumentsCours> documentCoursExists = documentsCoursRepository.findById(id);
        if (!documentCoursExists.isPresent()) {
            return "Document n'existe pas";
        }
        DocumentsCours documentsCours = documentCoursExists.get();
        if (documentsCours.getCours().getMatiere().getEnseignant().getId() != getEnsId()) {
            return "Vous n'etes pas autorisé à modifier ce document.";
        }
        Cours cours = coursRepository.findById(documentsCoursDto.getCoursId()).orElse(null);
        if (cours == null) {
            return "Cours n'existe pas.";
        }
        if (cours.getMatiere().getEnseignant().getId() != getEnsId()) {
            return "Vous n'etes pas autorisé à modifier un document à ce cours.";
        }

        String filename = file.getOriginalFilename().toLowerCase();
        if (filename != "") {
            Map<String, String> response = storeDocument(file);
            if (response.get("status").equals("error"))
                return response.get("message");
            deleteDocument(documentsCours.getChemin());
            documentsCours.setChemin(response.get("path"));

        }

        documentsCours.setNom(documentsCoursDto.getNom());
        documentsCours.setCours(cours);
        documentsCoursRepository.save(documentsCours);
        return null;
    }

    public void supprimerDocumentsCours(int id) {
        Optional<DocumentsCours> documentsCoursExists = documentsCoursRepository.findById(id);
        if (documentsCoursExists.isPresent()
                && documentsCoursExists.get().getCours().getMatiere().getEnseignant().getId() == getEnsId()) {
            deleteDocument(documentsCoursExists.get().getChemin());
            documentsCoursRepository.deleteById(id);
        }
    }
}
