
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
  nomDocument: string = ''; // Nom du document
  urlDocument: string = ''; // URL ou chemin du document

  constructor(private route: ActivatedRoute, private coursService: CoursService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courId = +params.get('id')!; // Récupérer l'ID du cours
    });
  }
  ajouterDocument(): void {
    this.coursService.ajouterDocument(this.nomDocument, this.courId).subscribe(
      response => {
        console.log('Réponse du serveur:', response);
        if (response.status === 'success') {
          console.log('Document ajouté avec succès');
          // redirection ou autre traitement après ajout
        } else {
          console.error('Erreur lors de l\'ajout du document :', response.message);
        }
      },
      error => {
        console.error('Erreur lors de la requête vers le serveur', error);
      }
    );
  }
}