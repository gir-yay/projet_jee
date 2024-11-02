package ma.ensa.project_jee.repository;


import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;



import ma.ensa.project_jee.model.Etudiant;
import ma.ensa.project_jee.model.Formation;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class EtudiantRepositoryTests {

    @Autowired
    private EtudiantRepository etudiantRepository;


    private Etudiant etudiant;

    @BeforeEach
    public void setUp() {
        Formation formation = Formation.builder().id(1).build();

        etudiant = Etudiant.builder()
                .id(1)
                .nom("Doe")
                .prenom("John")
                .email("johndoe@example.com")
                .motDePass("password")
                .numApogee(12345)
                .numSemestre(1)
                .formation(formation)
                .build();

        etudiantRepository.save(etudiant);
    }

    @Test
    public void testFindByEmail() {
        Optional<Etudiant> foundEtudiant = etudiantRepository.findByEmail("johndoe@example.com");
        
        // Use AssertJ's assertThat
        Assertions.assertThat(foundEtudiant).isPresent();  // Checks if the optional is present
        Assertions.assertThat(foundEtudiant.get().getNom()).isEqualTo("Doe");  // Checks the name
        Assertions.assertThat(foundEtudiant.get().getPrenom()).isEqualTo("John");  // Checks the first name
    }

    @Test
    public void testFindByNumApogee() {
        Etudiant foundEtudiant = etudiantRepository.findByNumApogee(12345);
        
        // Use AssertJ's assertThat
        Assertions.assertThat(foundEtudiant).isNotNull();  // Check if foundEtudiant is not null
        Assertions.assertThat(foundEtudiant.getNom()).isEqualTo("Doe");  // Check the name
        Assertions.assertThat(foundEtudiant.getPrenom()).isEqualTo("John");  // Check the first name
    }


}



