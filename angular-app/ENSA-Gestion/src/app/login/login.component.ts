/*import { Component } from '@angular/core';*/
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}
  // js pour le counter

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startCounters(); 
    }
  }

  startCounters() {
    if (typeof document !== 'undefined') {
      const counts = document.querySelectorAll('.count');

      counts.forEach((counter) => {
        const htmlCounter = counter as HTMLElement;

        function upDate() {
          const target = Number(htmlCounter.getAttribute('data-target'));
          const count = Number(htmlCounter.innerText);
          const speed = Number(htmlCounter.getAttribute('data-speed')); // Récupérer la vitesse depuis l'attribut
          const inc = target / speed;

          if (count < target) {
            htmlCounter.innerText = Math.floor(count + inc).toString();
            setTimeout(upDate, 15);
          } else {
            htmlCounter.innerText = target.toString();
          }
        }

        upDate();
      });
    }
  }

  login() {
    // Logique de validation de connexion ici
    const validLogin = true; // Remplace par ta logique réelle

    if (validLogin) {
      // Rediriger vers le dashboard après validation
      this.router.navigate(['/dashboard']);
    }
  }
}