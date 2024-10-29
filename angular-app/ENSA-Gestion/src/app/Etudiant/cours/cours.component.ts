import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../services/module.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  cours: any[] = [];
  matiereId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.matiereId = Number(params.get('id'));
      if (this.matiereId) {
        this.moduleService.getCours(this.matiereId).subscribe(
          (data: any[]) => {
            this.cours = data; 
          },
          (error: any) => {
            console.error('Erreur lors de la récupération des cours:', error);
          }
        );
      }
    });
  }
}
