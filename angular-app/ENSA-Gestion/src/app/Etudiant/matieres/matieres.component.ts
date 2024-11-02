import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../services/module.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 




@Component({
  selector: 'app-matieres',
  standalone: true,
  templateUrl: './matieres.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./matieres.component.css'],

})
export class MatieresComponent implements OnInit {
  matieres: any[] = [];
  moduleId: number | null = null;
  errorMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.moduleId = Number(params.get('id'));
      if (this.moduleId) {
        this.moduleService.getMatieres(this.moduleId).subscribe(
          (data: any[]) => {
            this.matieres = data; 
          },
          (error: any) => {
            this.errorMessage = 'Erreur lors de la récupération des matières. Veuillez réessayer.';
            console.error('Erreur lors de la récupération des matières:', error);
          }
        );
      }
    });
  }
  
}
