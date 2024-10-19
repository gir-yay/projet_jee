package ma.ensa.project_jee.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor

@Entity(name = "etudiants")
public class Etudiant extends Utilisateur {

    @Getter
    @Setter
    @Column(unique = true)
    private int numApogee;
    @Getter
    @Setter
    private int numSemestre;
    @Getter
    @Setter
    @Column(columnDefinition = "BOOLEAN DEFAULT 1")
    private boolean status;

    @Getter
    @Setter
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "formation_id")
    private Formation formation;
    @Getter
    @Setter
    @OneToMany(mappedBy = "etudiant")
    private List<Note> notes;

    /*
     * public Etudiant(int id, String nom, String prenom, String email, String
     * password, int numApogee, int semestre, boolean status){
     * super(id, nom, prenom, email, password);
     * this.numApogee = numApogee;
     * this.semestre = semestre
     * this.status = status;
     * }
     */
}
