package ma.ensa.project_jee.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import com.opencsv.CSVReader;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.util.Iterator;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import ma.ensa.project_jee.model.Directeur;
import ma.ensa.project_jee.model.Enseignant;
import ma.ensa.project_jee.model.Etudiant;
import ma.ensa.project_jee.model.Formation;
import ma.ensa.project_jee.repository.DirecteurRepository;
import ma.ensa.project_jee.repository.EnseignantRepository;
import ma.ensa.project_jee.repository.EtudiantRepository;
import ma.ensa.project_jee.repository.FormationRepository;

@RequiredArgsConstructor
@Service
public class UserService {

    private final DirecteurRepository directeurRepository;
    private final EnseignantRepository enseignantRepository;
    private final EtudiantRepository etudiantRepository;
    private final PasswordEncoder passwordEncoder;
    private final FormationRepository formationRepository;

    public String ajouterDirecteur(MultipartFile file) {
        String fileName = file.getOriginalFilename().toLowerCase();
        if (!fileName.endsWith("xlsx") && !fileName.endsWith("xls") && !fileName.endsWith("csv")) {
            return "Le fichier doit être un fichier Excel ou CSV";
        }
        try {
            if (fileName.endsWith("csv")) {
                try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
                    CSVReader csvReader = new CSVReader(br);
                    String[] values;
                    while ((values = csvReader.readNext()) != null) {
                        Directeur directeur = directeurRepository.findByEmail(values[2]).orElse(null);
                        if (directeur == null) {
                            directeur = new Directeur();
                        }
                        directeur.setNom(values[0]);
                        directeur.setPrenom(values[1]);
                        directeur.setEmail(values[2]);
                        directeur.setMotDePass(passwordEncoder.encode(values[3]));
                        directeurRepository.save(directeur);
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

                    if (row.getRowNum() == 0) {
                        continue;
                    }

                    Directeur directeur = directeurRepository.findByEmail(row.getCell(2).getStringCellValue())
                            .orElse(null);
                    if (directeur == null) {
                        directeur = new Directeur();
                    }
                    directeur.setNom(row.getCell(0).getStringCellValue());
                    directeur.setPrenom(row.getCell(1).getStringCellValue());
                    directeur.setEmail(row.getCell(2).getStringCellValue());

                    directeur.setMotDePass(passwordEncoder.encode(row.getCell(3).getStringCellValue()));

                    directeurRepository.save(directeur);
                }
                workbook.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Erreur lors de la lecture du fichier : " + e.getMessage();
        }
        return null;
    }

    public String ajouterEnseignant(MultipartFile file) {
        String fileName = file.getOriginalFilename().toLowerCase();
        if (!fileName.endsWith("xlsx") && !fileName.endsWith("xls") && !fileName.endsWith("csv")) {
            return "Le fichier doit être un fichier Excel ou CSV";
        }
        try {
            if (fileName.endsWith("csv")) {
                try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
                    CSVReader csvReader = new CSVReader(br);
                    String[] values;
                    while ((values = csvReader.readNext()) != null) {
                        Enseignant enseignant = enseignantRepository.findByEmail(values[2]).orElse(null);
                        if (enseignant == null) {
                            enseignant = new Enseignant();
                        }
                        enseignant.setNom(values[0]);
                        enseignant.setPrenom(values[1]);
                        enseignant.setEmail(values[2]);
                        enseignant.setMotDePass(passwordEncoder.encode(values[3]));
                        enseignantRepository.save(enseignant);
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

                    if (row.getRowNum() == 0) {
                        continue;
                    }

                    Enseignant enseignant = enseignantRepository.findByEmail(row.getCell(2).getStringCellValue())
                            .orElse(null);
                    if (enseignant == null) {
                        enseignant = new Enseignant();
                    }
                    enseignant.setNom(row.getCell(0).getStringCellValue());
                    enseignant.setPrenom(row.getCell(1).getStringCellValue());
                    enseignant.setEmail(row.getCell(2).getStringCellValue());
                    enseignant.setMotDePass(passwordEncoder.encode(row.getCell(3).getStringCellValue()));

                    enseignantRepository.save(enseignant);
                }
                workbook.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Erreur lors de la lecture du fichier : " + e.getMessage();
        }
        return null;
    }

    public String ajouterEtudiant(MultipartFile file) {
        String fileName = file.getOriginalFilename().toLowerCase();
        if (!fileName.endsWith("xlsx") && !fileName.endsWith("xls") && !fileName.endsWith("csv")) {
            return "Le fichier doit être un fichier Excel ou CSV";
        }
        try {
            if (fileName.endsWith("csv")) {
                try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
                    CSVReader csvReader = new CSVReader(br);
                    String[] values;
                    while ((values = csvReader.readNext()) != null) {
                        Etudiant etudiant = etudiantRepository.findByEmail(values[2]).orElse(null);
                        if (etudiant == null) {
                            etudiant = new Etudiant();
                        }
                        etudiant.setNom(values[0]);
                        etudiant.setPrenom(values[1]);
                        etudiant.setEmail(values[2]);

                        etudiant.setMotDePass(passwordEncoder.encode(values[3]));
                        try {
                            etudiant.setNumApogee(Integer.parseInt(values[4]));
                        } catch (Exception e) {
                            return "Le numéro d'apogée " + values[4]
                                    + " existe déjà, veuillez vérifier les données et réessayer.";
                        }
                        etudiant.setNumSemestre(Integer.parseInt(values[5]));
                        Optional<Formation> formationExists = formationRepository.findById(Integer.parseInt(values[6]));
                        if (!formationExists.isPresent()) {
                            return "Une formation dans le fichier n'existe pas, veuillez vérifier les données et réessayer.";
                        }
                        etudiant.setFormation(formationExists.get());
                        etudiantRepository.save(etudiant);
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

                    if (row.getRowNum() == 0) {
                        continue;
                    }

                    Etudiant etudiant = etudiantRepository.findByEmail(row.getCell(2).getStringCellValue())
                            .orElse(null);
                    if (etudiant == null) {
                        etudiant = new Etudiant();
                    }
                    etudiant.setNom(row.getCell(0).getStringCellValue());
                    etudiant.setPrenom(row.getCell(1).getStringCellValue());
                        etudiant.setEmail(row.getCell(2).getStringCellValue());
                    
                    etudiant.setMotDePass(passwordEncoder.encode(row.getCell(3).getStringCellValue()));
                    try {
                        etudiant.setNumApogee((int) row.getCell(4).getNumericCellValue());
                    } catch (Exception e) {
                        return "Le numéro d'apogée " + row.getCell(4).getNumericCellValue()
                                + " existe déjà, veuillez vérifier les données et réessayer.";
                    }
                    etudiant.setNumSemestre((int) row.getCell(5).getNumericCellValue());
                    Optional<Formation> formationExists = formationRepository
                            .findById((int) row.getCell(6).getNumericCellValue());
                    if (!formationExists.isPresent()) {
                        return "Une formation dans le fichier n'existe pas, veuillez vérifier les données et réessayer.";
                    }
                    etudiant.setFormation(formationExists.get());
                    etudiantRepository.save(etudiant);
                }
                workbook.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Erreur lors de la lecture du fichier : " + e.getMessage();
        }
        return null;
    }

    public String archiverEnseignat(int id) {
        Optional<Enseignant> enseignant = enseignantRepository.findById(id);
        if (!enseignant.isPresent()) {
            return "L'enseignant n'existe pas";
        }
        enseignant.get().setStatus(false);
        ;
        enseignantRepository.save(enseignant.get());
        return null;
    }

    public String archiverEtudiant(int id) {
        Optional<Etudiant> etudiant = etudiantRepository.findById(id);
        if (!etudiant.isPresent()) {
            return "L'étudiant n'existe pas";
        }
        etudiant.get().setStatus(false);
        ;
        etudiantRepository.save(etudiant.get());
        return null;
    }

}
