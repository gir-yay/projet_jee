
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
    this.loadScript('assets/js/table.js');
    this.loadCoursDetails();
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
  loadScript(src: string): void {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

  loadDocuments(): void {
    this.documentsService.getDocumentsByCoursId(this.coursId).subscribe(
      (data) => {
        this.documents = data; // Stocker les documents
      },
      (error) => {
        console.error('Erreur lors de la récupération des documents', error);
      }
    );
  }
  
  deletedocument(document: any): void {
    this.documentsService.supprimerDocument(document.id).subscribe(
      () => { // Pas besoin de vérifier la réponse car il n'y en a pas
        const index = this.documents.indexOf(document);
        if (index > -1) {
          this.documents.splice(index, 1); // Supprime le lien localement
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
  
  
}