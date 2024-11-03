import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../services/module.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cours',
  standalone: true,
  templateUrl: './cours.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  cours: any[] = [];
  matiereId: number | null = null;
  errorMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.matiereId = Number(params.get('matiereId'));

      if (this.matiereId) {
        this.moduleService.getCours(this.matiereId).subscribe(
          (data: any[]) => {
            console.log('Données des cours récupérées:', data); // Vérification
            this.cours = data;
          },
          (error: any) => {
            this.errorMessage = 'Erreur lors de la récupération des cours. Veuillez réessayer.';
            console.error('Erreur lors de la récupération des cours:', error);
          }
        );
      }
    });
  }
}
