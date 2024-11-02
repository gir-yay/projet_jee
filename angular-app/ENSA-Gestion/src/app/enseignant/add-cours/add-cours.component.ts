import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CoursService } from '../../services/cours.service';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-cours',
  standalone: true,
  imports: [RouterModule,FormsModule ],
  templateUrl: './add-cours.component.html',
  styleUrl: './add-cours.component.css'
})
export class AddCoursComponent {
  nouveauCour = {
  nom: ''
};
matiereId: number = 0; // Assurez-vous que cet ID est bien passé

constructor(private coursService: CoursService, private router: Router, private route: ActivatedRoute) {
  this.matiereId = +this.route.snapshot.paramMap.get('matiereId')!; // Récupère matiereId à partir de l'URL
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
}