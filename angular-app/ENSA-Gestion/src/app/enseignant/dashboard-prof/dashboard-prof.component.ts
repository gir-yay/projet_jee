import { Component ,  OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatiereEnseignantService} from '../../services/enseignant/matiere-enseignant.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Ajoutez cette ligne


@Component({
  selector: 'app-dashboard-prof',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard-prof.component.html',
  styleUrl: './dashboard-prof.component.css'
})

export class DashboardProfComponent implements OnInit  {
  matieres: any[] = []; // Utilisez le type approprié ici

  constructor(
    private matiereService: MatiereEnseignantService,
    private router: Router) {} // Ajout d'une parenthèse fermante

  ngOnInit(): void {
    this.loadMatieres();
    this.getMatieresGroups();
  }
  getMatieresGroups() {
    const groups = [];
    for (let i = 0; i < this.matieres.length; i += 4) {
      groups.push(this.matieres.slice(i, i + 4));
    }
    return groups;
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

  goToCours(matiereId: number): void {
    this.router.navigate(['/matiere', matiereId, 'cours']); // Redirige vers la page des cours
  }
}
