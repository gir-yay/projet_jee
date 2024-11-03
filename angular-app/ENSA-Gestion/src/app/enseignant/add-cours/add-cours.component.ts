import { Component ,  OnInit  } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CoursService } from '../../services/cours.service';
import { MatiereEnseignantService} from '../../services/enseignant/matiere-enseignant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-cours',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './add-cours.component.html',
  styleUrl: './add-cours.component.css'
})
export class AddCoursComponent implements OnInit {
  nouveauCour = {
  nom: ''
};
matiereId: number = 0; // Assurez-vous que cet ID est bien passé
MatiereNom  : string ='';

constructor(
  private coursService: CoursService,
  private router: Router, private route: ActivatedRoute,
  private matiereService: MatiereEnseignantService,)
  {
   // Récupère matiereId à partir de l'URL
}
ngOnInit(): void {
  this.matiereId = +this.route.snapshot.paramMap.get('id')!;
  console.log('matiereId récupéré:', this.matiereId); // Vérifiez la valeur ici

  if (this.matiereId > 0) {
    this.loadMatieresDetails();
  } else {
    console.warn('matiereId est invalide.');
  }
}

ajouterCour(): void {
  this.coursService.ajouterCour(this.nouveauCour, this.matiereId).subscribe(
    (response) => {
      console.log('Cours ajouté avec succès:', response);
      this.router.navigate([`matiere/${this.matiereId}/cours`]); // Redirection après ajout
    },
    (error) => {
      console.error("Erreur lors de l'ajout du cours:", error);
    }
  );
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
}