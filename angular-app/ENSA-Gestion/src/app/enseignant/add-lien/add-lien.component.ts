import { RouterModule } from '@angular/router'; 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CoursService } from '../../services/cours.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-add-lien',
  standalone: true,
  imports: [ RouterModule ,CommonModule,FormsModule],
  templateUrl: './add-lien.component.html',
  styleUrl: './add-lien.component.css'
})
export class AddLienComponent implements OnInit {
  courId: number = 0;
  nomLien: string = ''; // Nom du lien

  constructor(private route: ActivatedRoute, private coursService: CoursService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courId = +params.get('id')!; // Récupérer l'ID du cours
    });
  }

  ajouterLien(): void {
    const lienData = {
      lien: this.nomLien,
    };

    this.coursService.ajouterLien(this.courId, lienData).subscribe(
      response => {
        console.log('Lien ajouté avec succès', response);
        this.router.navigate(['/enseignant/liens-cours', this.courId]); // Rediriger vers la liste des liens
      },
      error => {
        console.error('Erreur lors de l\'ajout du lien', error);
      }
    );
  }
}