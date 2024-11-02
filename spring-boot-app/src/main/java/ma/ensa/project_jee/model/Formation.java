package ma.ensa.project_jee.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="formations")
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true, length = 70)
    private String nom;
    private int nbrSemestres;

    public Formation (int id, String nom, int nbrSemestres) {
        this.id = id;
        this.nom = nom;
        this.nbrSemestres = nbrSemestres;
    }

    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Etudiant> etudiants;
    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Module> modules;
}
