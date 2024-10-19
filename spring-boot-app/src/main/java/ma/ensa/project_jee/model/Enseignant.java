package ma.ensa.project_jee.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor

@Entity(name="enseignants")
public class Enseignant extends Utilisateur{
    
    @Setter
    @Getter
    @Column(columnDefinition = "BOOLEAN DEFAULT 1")
    private boolean status;
    @Setter
    @Getter
    @OneToMany(mappedBy="enseignant")
    private List<Matiere> matieres;
    /*public Enseignant(int id, String nom, String prenom, String email, String password, boolean status){
        super(id, nom, prenom, email, password);
        this.status = status;
    }*/
}
