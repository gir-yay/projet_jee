import { Component , OnInit , ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormationService } from '../services/formation.service';


@Component({
  selector: 'app-add-module',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './add-module.component.html',
  styleUrl: './add-module.component.css'
})
export class AddModuleComponent implements  AfterViewInit, OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2,  private formationService: FormationService) {}

  formations: any[] = [];

  ngOnInit(): void {

    this.formationService.getFormations().subscribe(
      (data: any[]) => {
        this.formations = data; 
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des modules:', error);
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
