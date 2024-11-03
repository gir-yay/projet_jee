
import { RouterModule } from '@angular/router'; 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CoursService } from '../../services/cours.service';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router'; 

@Component({
  selector: 'app-add-document',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.css'
})
export class AddDocumentComponent implements OnInit {
  courId: number = 0;
  coursNom: string = '';
  nomDocument: string = ''; // Nom du document
  urlDocument: string = ''; // URL ou chemin du document
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, 
    private coursService: CoursService, 
    private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courId = +params.get('id')!; // Récupérer l'ID du cours
    });
    this.loadCoursDetails();
  }
    // Gestion de la sélection du fichier
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
    ajouterDocument() {
      if (this.selectedFile && this.nomDocument && this.courId) {
        console.log('Document à ajouter:', {
          nom: this.nomDocument,
          courId: this.courId,
          file: this.selectedFile // Assurez-vous que c'est un objet File
        });
        this.coursService.ajouterDocument(this.nomDocument, this.courId, this.selectedFile).subscribe(
          (response: any) => {
            console.log('Réponse du serveur:', response);
            if (response.status === 'success') {
              alert('Document ajouté avec succès');
            } else {
              alert(`Erreur: ${response.message}`);
            }
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du document:', error);
          }
        );
      } else {
        console.error('Tous les champs sont requis');
      }
    }
     // Charger les détails du cours
  loadCoursDetails(): void {
    this.coursService.getCoursById(this.courId).subscribe(
      (data) => {
        console.log('Détails du cours:', data); // Débogage : vérifiez la réponse de l'API
        if (data && data.nom ) { // Assurez-vous que le champ `nom` existe
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
}
