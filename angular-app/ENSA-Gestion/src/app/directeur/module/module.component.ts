import { Component ,  OnInit , ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormationService } from '../services/formation.service';
import { ModuleService } from '../services/module.service';


@Component({
  selector: 'app-module',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent  implements  AfterViewInit, OnInit {
  
  constructor(private el: ElementRef, private renderer: Renderer2,  private formationService: FormationService, private moduleService : ModuleService,  private route: ActivatedRoute) {}

  formations: any[] = [];
  modules : any[] = [];
  formationId: number = 0;
  oneFormation: any;

  groupedModules: any[][] = [];

 
  ngOnInit(): void {
    this.formationService.getFormations().subscribe(
      (data: any[]) => {
        this.formations = data; 
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des modules:', error);
      }

    );

    
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) { // Vérifie que idParam n'est pas null
        this.formationId = +idParam; // Convertir en nombre
        this.loadModules(); // Charger les cours après avoir récupéré l'ID
        this.loadFormation();
      } else {
        console.error('L\'ID de la formation est introuvable dans l\'URL.');
        // Vous pouvez gérer le cas où idParam est null ici
      }
    });

   


    


  }

  groupModules(size: number) {
    for (let i = 0; i < this.modules.length; i += size) {
      this.groupedModules.push(this.modules.slice(i, i + size));
    }}

  loadModules(): void {
    this.moduleService.getModulesByFormation(this.formationId).subscribe(
      (data) => {
        this.modules = data; // Stocke les cours récupérés
        this.groupModules(5);

      },
      (error) => {
        console.error('Erreur lors de la récupération des matière', error);
      }
    );
  } 

  loadFormation(): void {
    this.moduleService.get(this.formationId).subscribe(
      (data) => {
        this.oneFormation = data; // Stocke les cours récupérés
      },
      (error) => {
        console.error('Erreur lors de la récupération des matière', error);
      }
    );
  } 

  

  ngAfterViewInit(): void {
    this.initializeSidebarDropdown();
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
