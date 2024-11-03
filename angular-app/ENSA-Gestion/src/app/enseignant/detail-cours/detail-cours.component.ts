import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from '../../services/cours.service';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-detail-cours',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './detail-cours.component.html',
  styleUrl: './detail-cours.component.css'
})
export class DetailCoursComponent  implements OnInit {
  courId: number =0;
  coursNom: string = '';
  matiereId :number =0;

  constructor(
    private route: ActivatedRoute,
    private courService: CoursService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courId = +params.get('id')!; // Récupérer l'ID du cours
      // Chargez les documents associés à courId ici
    });
    this.loadCoursDetails();
  }
  // Charger les détails du cours
  loadCoursDetails(): void {
    this.courService.getCoursById(this.courId).subscribe(
      (data) => {
        console.log('Détails du cours:', data); // Débogage : vérifiez la réponse de l'API
        if (data && data.nom ) { // Assurez-vous que le champ `nom` existe
          this.coursNom = data.nom;
          this.matiereId = data.matiere_id;
        } else {
          console.warn('Le champ nom est absent dans la réponse', data);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du cours:', error);
      }
    );
  }
}