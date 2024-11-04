import { Component,OnInit , ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { DirecteurService } from '../services/directeur.service';
import { FormationService } from '../services/formation.service';
import { UtilisateurService } from '../services/utilisateur.service';





@Component({
  selector: 'app-listes-directeurs',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listes-directeurs.component.html',
  styleUrl: './listes-directeurs.component.css'
})
export class ListesDirecteursComponent implements OnInit ,AfterViewInit {
  isPopupOpen = false;
  selectedFile: File | null = null;
  type : any = 'directeur';


  directeurs: any[] = [];

  formations: any[] = [];

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
      this.onSubmit();
      console.log(this.selectedFile);
    }
    this.closePopup(); // Ferme la popup après l'upload
  }


  constructor(private el: ElementRef, private renderer: Renderer2, private directeurService: DirecteurService, private formationService: FormationService, private utilisateurService: UtilisateurService) {}

  ngAfterViewInit(): void {
    this.initializeSidebarDropdown();
  }

//script pour la table
ngOnInit(): void {
  this.loadScript('../../../assets/js/table.js');
  
  this.directeurService.getDirecteurs().subscribe(
    (data: any[]) => {
      this.directeurs = data; 
    },
    (error: any) => {
      console.error('Erreur lors de la récupération des modules:', error);
    }
  );

  this.formationService.getFormations().subscribe(
    (data: any[]) => {
      this.formations = data; 
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
onSubmit() {
  if (this.selectedFile && this.type) {
    this.utilisateurService.ajouterUtilisateur(this.selectedFile, this.type)
      .subscribe({
        next: (response) => {
          console.log('Directeurs ajoutés avec succès:', response);
          // Afficher un message de succès ou rediriger l'utilisateur
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout des directeurs:', error);
          // Afficher un message d'erreur
        }
      });
  } else {
    console.warn('Le fichier et le type sont requis.');
  }
}
}
