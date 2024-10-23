import { Component,  OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import Swiper from 'swiper';


@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.css'
})
export class FormationComponent   implements OnInit {
  
  constructor() { }

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

  }
  loadScript(src: string): void {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

}
