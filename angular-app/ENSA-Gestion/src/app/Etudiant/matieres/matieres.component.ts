import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../services/module.service';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {
  matieres: any[] = [];
  moduleId: number | null = null;

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
            this.matieres = data; // Assignez les matières reçues
          },
          (error: any) => {
            console.error('Erreur lors de la récupération des matières:', error);
          }
        );
      }
    });
  }
}