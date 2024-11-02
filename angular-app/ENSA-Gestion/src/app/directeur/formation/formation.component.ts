import { Component,  OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import Swiper from 'swiper';
import { FormationService } from '../services/formation.service';



@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [RouterModule, CommonModule ],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.css'
})
export class FormationComponent implements OnInit {

  formations: any[] = [];
  nb_formation : any;
  
  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
  });
    // SIDEBAR DROPDOWN LOGIC
   

    this.loadScript('../../../assets/js/sidebar.js');


    this.formationService.getFormations().subscribe(
      (data: any[]) => {
        this.formations = data; 
        this.nb_formation = data.length;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des modules:', error);
      }
    );

  }
  loadScript(src: string): void {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

}
