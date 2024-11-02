import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EnseignantService } from '../services/enseignant.service';
import { EtudiantService } from '../services/etudiant.service';
import { FormationService } from '../services/formation.service';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  enseignants: any[] = [];
  matiere : any; 
  nb_ens : any;

  etudiants: any[] = [];
  nb_etu : any;

  formations: any[] = [];
  nb_formation : any;

  isPopupOpen = false;
  selectedFile: File | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2, private enseignantService: EnseignantService, private etudiantService: EtudiantService, private formationService: FormationService) {}

  ngAfterViewInit(): void {
    this.initializeSidebarDropdown();
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      console.log(this.selectedFile);
    }
    this.closePopup(); // Ferme la popup après l'upload
  }
//script pour la table
  ngOnInit(): void {
    this.loadScript('../../../assets/js/table.js');

    this.enseignantService.getEnseignants().subscribe(
      (data: any[]) => {
        this.enseignants = data; 
        this.nb_ens = data.length;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des modules:', error);
      }
    );


    this.etudiantService.getEtudiants().subscribe(
      (data: any[]) => {
        this.etudiants = data; 
        this.nb_etu = data.length;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des modules:', error);
      }
    );

    this.formationService.getEtudiants().subscribe(
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


  private initializeSidebarDropdown(): void {
    const dropdowns = this.el.nativeElement.querySelectorAll('#sidebar .side-dropdown');

    dropdowns.forEach((dropdown: HTMLElement) => {
      const link = dropdown.parentElement?.querySelector('a:first-child');
      if (link) {
        this.renderer.listen(link, 'click', (event: Event) => {
          event.preventDefault();
          this.toggleDropdown(link, dropdown, dropdowns);
        });
      }
    });
  }

  private toggleDropdown(link: Element, dropdown: HTMLElement, dropdowns: NodeListOf<HTMLElement>): void {
    const isActive = link.classList.contains('active');
    this.resetAllDropdowns(dropdowns);
    if (!isActive) {
      this.renderer.addClass(link, 'active');
      this.renderer.addClass(dropdown, 'show');
    }
  }

  private resetAllDropdowns(dropdowns: NodeListOf<HTMLElement>): void {
    dropdowns.forEach((dropdown: HTMLElement) => {
      const link = dropdown.parentElement?.querySelector('a:first-child');
      if (link) {
        this.renderer.removeClass(link, 'active');
      }
      this.renderer.removeClass(dropdown, 'show');
    });
  }
}
