
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
  isModalOpen: boolean = false;
  filteredDocuments : any[]  = []; // For storing filtered documents
  displayedDocuments : any[]  = [];
  sortAsc = true; // Sort direction flag
  loading: boolean = false; // Loading state
  selectedDocument: any = { nom: '', coursId: null, fileName: '' };
  selectedFile: File | null = null;

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
        this.router.navigateByUrl('/enseignant/documents-cours/' + this.coursId);
      },
      (error) => {
        console.error('Erreur lors de la suppression du lien:', error); // Affichez l'erreur
      }
    );
  }
  
  //modifier document (a modifier )
  
  openModal(document: any) {
    this.selectedDocument = { ...document }; // Cloner l'objet document pour l'édition
    this.selectedFile = null; // Réinitialiser le fichier sélectionné
    this.isModalOpen = true;
  }


  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]; // Stocker le fichier sélectionné
    }
  }

  updateDocument() {
    const documentId = this.selectedDocument.id; // Supposons que l'ID soit dans l'objet sélectionné
    const nom = this.selectedDocument.nom;
    const coursId = this.selectedDocument.coursId;

    this.documentsService.updateDocument(documentId, nom, this.coursId, this.selectedFile).subscribe(
      (response: any) => {
        console.log('Réponse du serveur:', response);
        if (response.status === 'success') {
          console.log('doccument modifié avec succés');
          this.isModalOpen = false; // Fermer le modal
          alert('Document modifié avec succès');
          this.loadDocuments();
        } else {
          alert(`Erreur: ${response.message}`);
        }
      },
      (error) => {
        console.error('Erreur lors de la modification du document:', error);
      }
    );
  }

}