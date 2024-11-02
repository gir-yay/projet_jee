import { RouterModule } from '@angular/router'; 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CoursService } from '../../services/cours.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-add-lien-cours',
  standalone: true,
  imports: [ RouterModule ,CommonModule,FormsModule],
  templateUrl: './add-lien-cours.component.html',
  styleUrl: './add-lien-cours.component.css'
})
export class AddLienCoursComponent implements OnInit {
  courId: number = 0;
  nomLien: string = ''; // Nom du lien

  constructor(private route: ActivatedRoute, private coursService: CoursService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courId = +params.get('id')!;
      console.log('ID du cours:', this.courId);
    });
  }

  ajouterLien(): void {
    const lienData = this.nomLien; 
  
    this.coursService.ajouterLien(lienData, this.courId).subscribe(
      response => {
        console.log('Lien ajouté avec succès', response);
        this.router.navigate(['/enseignant/liens-cours', this.courId]); // Rediriger vers la liste des liens
      },
      error => {
        console.error("Erreur lors de l'ajout du lien", error);
      }
    );
  }
}
