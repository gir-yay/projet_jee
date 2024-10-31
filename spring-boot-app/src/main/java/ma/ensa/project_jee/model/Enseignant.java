package ma.ensa.project_jee.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
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
    @OneToMany(mappedBy="enseignant", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Matiere> matieres;

}
