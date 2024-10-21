package ma.ensa.project_jee.model;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "matieres")
public class Matiere {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 50)
    private String nom;
    @ManyToOne
    @JoinColumn(name = "module_id")
    @JsonBackReference
    private Module module;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "enseignant_id")
    private Enseignant enseignant;

    @OneToMany(mappedBy="matiere", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Cours> cours;

    @OneToMany(mappedBy="matiere", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Note> notes;

}
