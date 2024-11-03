import { Component, OnInit , ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { FormationService } from '../services/formation.service';


@Component({
  selector: 'app-add-formation',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './add-formation.component.html',
  styleUrl: './add-formation.component.css'
})
export class AddFormationComponent implements   AfterViewInit, OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2, private formationService: FormationService, private router: Router, private route: ActivatedRoute) {}

  formations : any[] = [];
  formation = {
    nom : '',
    nbrSemestres : 0
  }

  ngAfterViewInit(): void {
    this.initializeSidebarDropdown();
  }

  ngOnInit(): void {
    
    this.formationService.getFormations().subscribe(
      (data: any[]) => {
        this.formations = data; 
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des modules:', error);
      }
    );}

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

  ajouterFormation(): void {
    this.formationService.ajouterFormation(this.formation).subscribe(
      (response) => {
        console.log('Cours ajouté avec succès:', response);
        this.router.navigateByUrl('/directeur/utilisateur/enseignants');
      },
      (error) => {
        console.error("Erreur lors de l'ajout du cours:", error);
      }
    );
  }
  

  

}
