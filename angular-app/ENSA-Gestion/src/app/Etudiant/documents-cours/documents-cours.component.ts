import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../services/module.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-documents-cours',
  templateUrl: './documents-cours.component.html',
  styleUrls: ['./documents-cours.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class DocumentsCoursComponent implements OnInit {
  documents: any[] = []; // Tous les documents chargés
  displayedDocuments : any[]  = []; // Documents affichés après recherche ou tri
  coursId!: number; // ID du cours, initialisé plus tard
  sortAsc: boolean = true; // Variable pour gérer l'ordre de tri
  loading: boolean = false;
  

  constructor(
    private moduleService: ModuleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.coursId = +this.route.snapshot.paramMap.get('id')!; // Assurez-vous que 'id' correspond à votre route
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.loading = true; // Début du chargement
    this.moduleService.getDocumentsByCoursId(this.coursId).subscribe(
      (data: Document[]) => {
        this.documents = data; // Stocke tous les documents
        this.displayedDocuments = [...this.documents]; // Initialise les documents affichés
        this.loading = false; // Fin du chargement
      },
      (error) => {
        console.error('Erreur lors du chargement des documents', error);
        this.loading = false; // Fin du chargement en cas d'erreur
      }
    );
  }


  // searchTable(event: Event) {
  //   const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
  //   this.displayedDocuments = this.documents.filter(document => 
  //     document.nom.toLowerCase().includes(searchValue)
  //   );
  // }
  // sortTable(column: keyof Document) { // Use keyof Document here
  //   this.sortAsc = !this.sortAsc; 
  //   this.displayedDocuments.sort((a, b) => {
  //     const comparison = a[column].localeCompare(b[column]);
  //     return this.sortAsc ? comparison : -comparison; 
  //   });
  // }

  downloadDocument(documentId: number) {
    this.moduleService.downloadDocument(documentId).subscribe({
      next: (response: HttpResponse<Blob>) => {
        const blob = response.body; // Récupérer le blob depuis le corps de la réponse
        
        if (blob && blob.size > 0) { // Vérifiez que le blob a des données
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `document_${documentId}.pdf`; // Nom du fichier
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url); // Libérer l'URL blob après téléchargement
        } else {
          console.error('Le blob est vide. Vérifiez la réponse du serveur.');
          alert('Erreur : le document est vide ou n’a pas pu être téléchargé.');
        }
      },
      error: (error) => {
        console.error('Erreur lors du téléchargement:', error);
        alert('Erreur lors du téléchargement du document.');
      }
    });
  }
  
  
  
}
