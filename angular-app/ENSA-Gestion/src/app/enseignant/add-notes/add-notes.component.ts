import { Component ,  OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CoursService } from '../../services/cours.service';
import { MatiereEnseignantService} from '../../services/enseignant/matiere-enseignant.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-document',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './add-notes.component.html',
  styleUrl: './add-notes.component.css'
})
export class AddNotesComponent  implements OnInit {
  matiereId: number = 0;
  matieres: any[] = [];
  MatiereNom  : string ='';
  selectedFile: File | null = null;
  
  constructor(
    private route: ActivatedRoute, 
    private noteService: CoursService,
    private matiereService: MatiereEnseignantService,
  ) {}
  ngOnInit(): void {
    this.matiereId = +this.route.snapshot.paramMap.get('id')!;
    console.log('matiereId récupéré:', this.matiereId); // Vérifiez la valeur ici
  
    if (this.matiereId > 0) {
      this.loadMatieresDetails();
    } else {
      console.warn('matiereId est invalide.');
    }
  }
  loadMatieresDetails(): void {
    this.matiereService.getMatierById(this.matiereId).subscribe(
      (data) => {
        console.log('Détails du matiere:', data); 
        if (data && data.nom) { // Assurez-vous que le champ `nom` existe
          this.MatiereNom = data.nom;
        } else {
          console.warn('Le champ nom est absent dans la réponse', data);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du Matiere:', error);
      }
    );
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    if (this.selectedFile && this.matiereId) {
      this.noteService.ajouterNotes(this.selectedFile, this.matiereId)
        .subscribe({
          next: (response) => {
            console.log('Notes ajoutées avec succès:', response);
            // Afficher un message de succès ou rediriger l'utilisateur
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout des notes:', error);
            // Afficher un message d'erreur
          }
        });
    } else {
      console.warn('Le fichier et l\'ID de la matière sont requis.');
    }
  }
  

}
