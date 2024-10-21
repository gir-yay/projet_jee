package ma.ensa.project_jee.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import com.opencsv.CSVReader;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Iterator;

import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.model.Etudiant;
import ma.ensa.project_jee.model.Matiere;
import ma.ensa.project_jee.model.Note;
import ma.ensa.project_jee.model.Utilisateur;
import ma.ensa.project_jee.repository.EtudiantRepository;
import ma.ensa.project_jee.repository.MatiereRepository;
import ma.ensa.project_jee.repository.NoteRepository;

@RequiredArgsConstructor
@Service
public class NoteEnseignantService {

    private final NoteRepository noteRepository;
    private final MatiereRepository matiereRepository;
    private final EtudiantRepository etudiantRepository;

    private int getEnsId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth.getPrincipal() instanceof Utilisateur) {
            Utilisateur user = (Utilisateur) auth.getPrincipal();
            System.out.println("\n\n\nEnsId=" + user.getId() + "\n\n\n");
            return user.getId();
        }
        return 0;
    }

    public String ajouterNotes(MultipartFile file, int matiereId) {

        if (file.isEmpty()) {
            return "Veillez choisir un fichier.";
        }
        String fileName = file.getOriginalFilename().toLowerCase();
        if (!fileName.endsWith("xlsx") && !fileName.endsWith("xls") && !fileName.endsWith("csv")) {
            return "Le fichier doit être un fichier Excel ou CSV";
        }
        Matiere matiere = matiereRepository.findById(matiereId).orElse(null);
        if (matiere == null) {
            return "La matiere n'existe pas.";
        }

        if(matiere.getEnseignant().getId() != getEnsId()) {
            return "Vous n'êtes pas autorisé à ajouter des notes pour cette matière.";
        }

        try {
            if (fileName.endsWith("csv")) {
                try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
                    CSVReader csvReader = new CSVReader(br);
                    String[] values;
                    while ((values = csvReader.readNext()) != null) {
                        Note note = new Note();
                        note.setMatiere(matiere);
                        Etudiant etudiant = etudiantRepository.findByNumApogee(Integer.parseInt(values[0]));
                        if (etudiant == null) {
                            return "L'étudiant avec le numéro d'apogée " + values[0] + " n'existe pas.";
                        }
                        note.setEtudiant(etudiant);
                        note.setValue(Float.parseFloat(values[1]));
                        noteRepository.save(note);
                    }
                }
            } else {
                Workbook workbook;
                if (fileName.endsWith("xlsx")) {
                    workbook = new XSSFWorkbook(file.getInputStream());
                } else {
                    workbook = new HSSFWorkbook(file.getInputStream());
                }

                Sheet sheet = workbook.getSheetAt(0);
                Iterator<Row> rowIterator = sheet.iterator();

                while (rowIterator.hasNext()) {
                    Row row = rowIterator.next();

                    Note note = new Note();
                    note.setMatiere(matiere);
                    Etudiant etudiant = etudiantRepository.findByNumApogee((int) row.getCell(0).getNumericCellValue());
                    if (etudiant == null) {
                        return "L'étudiant avec le numéro d'apogée " + row.getCell(0).getNumericCellValue()
                                + " n'existe pas.";
                    }
                    note.setEtudiant(etudiant);
                    note.setValue((float) row.getCell(1).getNumericCellValue());
                    noteRepository.save(note);
                }
                workbook.close();

            }

        } catch (Exception e) {
            return "Erreur lors de l'ajout des notes.";
        }
        return null;
    }
}
