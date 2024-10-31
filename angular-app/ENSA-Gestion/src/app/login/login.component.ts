/*import { Component } from '@angular/core';*/
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthServiceService } from '../services/auth-service.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, FormsModule,HttpClientModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  email: string = '';
  password: string = '';
  userType: string = '';
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthServiceService // Injection du service
  ) {}
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
    this.authService.login(this.email, this.password, this.userType).subscribe(
      (response) => {
        console.log(response)
        
        if (response.status === 'success') {
          localStorage.setItem('token', response.access_token); // Store the access token
        console.log("Token stored:", response.access_token);
          // Redirect based on user type
          if (this.userType === 'etudiant') {
            this.router.navigate(['/etudiant-dashboard']); // Adjust route as necessary
          } else if (this.userType === 'enseignant') {
            this.router.navigate(['/enseignant-dashboard']); // Adjust route as necessary
          } 
        } else {
          // Handle login error (show message to user)
          alert('Login failed: ' + response.message);
        }
      },
      (error) => {
        // Handle error (e.g., show alert)
        alert('An error occurred: ' + error.message);
      }
    );
  }
}