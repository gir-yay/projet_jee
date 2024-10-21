package ma.ensa.project_jee.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Entity(name = "etudiants")
public class Etudiant extends Utilisateur {

    public Etudiant() {
        super();
    }

    public Etudiant(int id, String nom, String prenom, String email, String motDePass, int numApogee, int numSemestre,
            Formation formation) {
        super(id, nom, prenom, email, motDePass); 
        this.numApogee = numApogee;
        this.numSemestre = numSemestre;
        this.formation = formation;
    }

    @Getter
    @Setter
    @Column(unique = true)
    private int numApogee;
    @Getter
    @Setter
    private int numSemestre;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "formation_id")
    @JsonBackReference
    private Formation formation;
    @Getter
    @Setter
    @OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Note> notes;

}
