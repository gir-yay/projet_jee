import { Component ,  OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CoursService } from '../../services/cours.service';
import { MatiereEnseignantService} from '../../services/enseignant/matiere-enseignant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit {
  cours: any[] = []; // Tableau pour stocker les cours
  matiereId: number = 0; // Variable pour stocker l'ID de la matière
  selectedCour: any; // Pour stocker le cours sélectionné
  isModalOpen: boolean = false; // Pour contrôler l'affichage du modal
  matieres: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private coursService: CoursService,
    private matiereService: MatiereEnseignantService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) { // Vérifie que idParam n'est pas null
        this.matiereId = +idParam; // Convertir en nombre
        this.loadCours(); // Charger les cours après avoir récupéré l'ID
      } else {
        console.error('L\'ID de la matière est introuvable dans l\'URL.');
        // Vous pouvez gérer le cas où idParam est null ici
      }
    });
    this.loadMatieres();
  }
  loadMatieres(): void {
    this.matiereService.getMatieres().subscribe(
      (data) => {
        this.matieres = data; // Assurez-vous que c'est le bon format
      },
      (error) => {
        console.error('Erreur lors de la récupération des matières', error);
      }
    );
  }
  loadCours(): void {
    this.coursService.getCoursByMatiereId(this.matiereId).subscribe(
      (data) => {
        this.cours = data; // Stocke les cours récupérés
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours', error);
      }
    );
  } 
  deleteCour(cour: any): void { // Using 'any' type for quick resolution
    this.coursService.deleteCour(cour.id).subscribe(
      (response) => {
        const index = this.cours.indexOf(cour);
        if (index > -1) {
          this.cours.splice(index, 1); // Remove course from the array
        }
        console.log(`Course ${cour.nom} deleted.`);
      },
      (error) => {
        console.error('Error deleting course:', error);
      }
    );
  } 
  updateCour(): void {
    console.log('Selected Course:', this.selectedCour); // Ajoutez cette ligne pour vérifier les données
    this.coursService.updateCour(this.selectedCour.id, this.selectedCour).subscribe(
      (response) => {
        const index = this.cours.findIndex(c => c.id === this.selectedCour.id);
        if (index > -1) {
          this.cours[index] = this.selectedCour; // Mettez à jour le cours dans le tableau
        }
        console.log('Cours mis à jour avec succès:', response);
        this.isModalOpen = false; // Fermez le modal après la mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du cours:', error);
      }
    );
  }
  openModal(cour: any): void {
    this.selectedCour = { ...cour }; 
    this.isModalOpen = true; 
  }
  
  getCoursGroups() {
    const groups = [];
    for (let i = 0; i < this.cours.length; i += 4) {
      groups.push(this.cours.slice(i, i + 4));
    }
    return groups;
  }
}