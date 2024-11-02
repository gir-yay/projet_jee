import { Component, OnInit , ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { EtudiantService } from '../services/etudiant.service';


@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.css'
})
export class ListStudentsComponent   implements OnInit , AfterViewInit  {
  isPopupOpen = false;
  selectedFile: File | null = null;

  etudiants: any[] = [];
  nb_etu : any;

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


  constructor(private el: ElementRef, private renderer: Renderer2, private etudiantService: EtudiantService) {}

  ngAfterViewInit(): void {
    this.initializeSidebarDropdown();
  }

//script pour la table
ngOnInit(): void {
  this.loadScript('../../../assets/js/table.js');

  this.etudiantService.getEtudiants().subscribe(
    (data: any[]) => {
      this.etudiants = data; 
      this.nb_etu = data.length;
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
