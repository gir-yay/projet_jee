
import { RouterModule ,Router} from '@angular/router'; 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CoursService } from '../../services/cours.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-documents-cour',
  standalone: true,
  imports: [ RouterModule,FormsModule,CommonModule],
  templateUrl: './documents-cour.component.html',
  styleUrl: './documents-cour.component.css'
})
export class DocumentsCourComponent  implements OnInit {
  coursId: number=0;
  documents: any[] = []; // Pour stocker les documents récupérés
  coursNom: string = '';
  selecteddocument: any;
  isModalOpen: boolean = false;
  filteredDocuments : any[]  = []; // For storing filtered documents
  displayedDocuments : any[]  = [];
  sortAsc = true; // Sort direction flag
  loading: boolean = false; // Loading state

  constructor(
    private route: ActivatedRoute,
    private documentsService: CoursService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.coursId = +params.get('id')!; // Récupérer l'ID du cours
      this.loadDocuments(); // Charger les documents
    });
    this.loadCoursDetails();
    this.filteredDocuments = this.documents;
  }


 // Search for documents based on input
 searchTable(event: Event) {
  const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
  this.displayedDocuments = this.documents.filter(document => 
    document.nom.toLowerCase().includes(searchValue)
  );
}

// Sort documents by specified column
sortTable(column: string) {
  this.sortAsc = !this.sortAsc; 
  this.displayedDocuments.sort((a, b) => {
    const comparison = a[column].localeCompare(b[column]); 
    return this.sortAsc ? comparison : -comparison; 
  });
}


  // Charger les détails du cours
  loadCoursDetails(): void {
    this.documentsService.getCoursById(this.coursId).subscribe(
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
  loadDocuments(): void {
    this.loading = true; // Set loading state
    this.documentsService.getDocumentsByCoursId(this.coursId).subscribe(
      data => {
        this.documents = data; // Store documents
        this.displayedDocuments = [...this.documents]; // Start with all documents displayed
        this.loading = false; // Reset loading state
      },
      error => {
        console.error('Error fetching documents', error);
        this.loading = false; // Reset loading state
      }
    );

  }
  
  deletedocument(document: any): void {
    this.documentsService.supprimerDocument(document.id).subscribe(
      () => { // Pas besoin de vérifier la réponse car il n'y en a pas
        const index = this.documents.indexOf(document);
        if (index > -1) {
          this.documents.splice(index, 1); // Supprime le lien localement
          this.displayedDocuments.splice(index, 1);
        }
        console.log(`Document ${document.nom} supprimé avec succès.`);
        // Redirige vers la même page pour actualiser le contenu
        this.router.navigateByUrl('/documents-cour/' + this.coursId);
      },
      (error) => {
        console.error('Erreur lors de la suppression du lien:', error); // Affichez l'erreur
      }
    );
  }
  
  //modifier document (a modifier )
  updatedocument(): void {
    console.log('Selected lien:', this.selecteddocument); // Ajoutez cette ligne pour vérifier les données
    this.documentsService.updatelien(this.selecteddocument.id, this.selecteddocument).subscribe(
      (response) => {
        const index = this.documents.findIndex(c => c.id === this.selecteddocument.id);
        if (index > -1) {
          this.documents[index] = this.selecteddocument; // Mettez à jour le cours dans le tableau
          this.displayedDocuments[index] = this.selecteddocument;
        }
        console.log('Lien mis à jour avec succès:', response);
        this.isModalOpen = false; // Fermez le modal après la mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du cours:', error);
      }
    );
  }
  openModal(document: any): void {
    this.selecteddocument = { ...document }; 
    this.isModalOpen = true; 
  }
}