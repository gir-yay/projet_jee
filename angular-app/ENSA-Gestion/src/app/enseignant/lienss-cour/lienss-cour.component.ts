
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CoursService } from '../../services/cours.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 



@Component({
  selector: 'app-lienss-cour',
  standalone: true,
  imports: [ RouterModule,FormsModule,CommonModule],
  templateUrl: './lienss-cour.component.html',
  styleUrl: './lienss-cour.component.css'
})
export class LienssCourComponent implements OnInit {
  coursId: number=0;
  liens: any[] = []; 
  coursNom: string = '';
  selectedLien: any;
  isModalOpen: boolean = false;
  filteredliens : any[]  = []; // For storing filtered documents
  displayedliens : any[]  = [];
  sortAsc = true; // Sort direction flag
  loading: boolean = false; // Loading state


  constructor(
    private route: ActivatedRoute,
    private liensService: CoursService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.coursId = +params.get('id')!; // Récupérer l'ID du cours
      this.loadliens(); // Charger les documents
    });

    this.loadCoursDetails();
    this.filteredliens = this.liens;
  }


 // Search for documents based on input
 searchTable(event: Event) {
  const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
  this.displayedliens = this.liens.filter(lien => 
    lien.lien.toLowerCase().includes(searchValue)
  );
}

// Sort documents by specified column
sortTable(column: string) {
  this.sortAsc = !this.sortAsc; // Toggle sort direction
  this.displayedliens.sort((a, b) => {
    const comparison = a[column].localeCompare(b[column]); // Use localeCompare for string comparison
    return this.sortAsc ? comparison : -comparison; // Sort based on the direction
  });
}

  // Charger les détails du cours
  loadCoursDetails(): void {
    this.liensService.getCoursById(this.coursId).subscribe(
      (data) => {
        console.log('Détails du cours:', data); // Débogage : vérifiez la réponse de l'API
        if (data && data.nom) { // Assurez-vous que le champ `nom` existe
          this.coursNom = data.nom;
        } else {
          console.warn('Le champ nom est absent dans la réponse', data);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du cours:', error);
      }
    );
  }
  loadliens(): void {
    this.loading = true; // Set loading state
    this.liensService.getLiensByCoursId(this.coursId).subscribe(
      data => {
        this.liens = data; // Store documents
        this.displayedliens = [...this.liens]; // Start with all documents displayed
        this.loading = false; // Reset loading state
      },
      error => {
        console.error('Error fetching documents', error);
        this.loading = false; // Reset loading state
      }
    );
  }
  deleteLien(lien: any): void {
    this.liensService.supprimerLien(lien.id).subscribe(
      () => { // Pas besoin de vérifier la réponse car il n'y en a pas
        const index = this.liens.indexOf(lien);
        if (index > -1) {
          this.liens.splice(index, 1); // Supprime le lien localement
          this.displayedliens.splice(index, 1);
        }
        console.log(`Lien ${lien.lien} supprimé avec succès.`);
        // Redirige vers la même page pour actualiser le contenu
        this.router.navigateByUrl('/lienss-cour/' + this.coursId);
      },
      (error) => {
        console.error('Erreur lors de la suppression du lien:', error); // Affichez l'erreur
      }
    );
  }
  //modifier
  updatelien(): void {
    console.log('Selected lien:', this.selectedLien); // Ajoutez cette ligne pour vérifier les données
    this.liensService.updatelien(this.selectedLien.id, this.selectedLien).subscribe(
      (response) => {
        const index = this.liens.findIndex(c => c.id === this.selectedLien.id);
        if (index > -1) {
          this.liens[index] = this.selectedLien; // Mettez à jour le cours dans le tableau
          this.displayedliens[index] = this.selectedLien;
        }
        console.log('Lien mis à jour avec succès:', response);
        this.isModalOpen = false; // Fermez le modal après la mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du cours:', error);
      }
    );
  }

  openModal(lien: any): void {
    this.selectedLien = { ...lien }; 
    this.isModalOpen = true; 
  }
}