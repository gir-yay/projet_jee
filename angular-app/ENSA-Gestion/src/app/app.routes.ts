import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
// import { LoginAdminComponent } from './login-admin/login-admin.component';


import { DashboardComponent } from './directeur/dashboard/dashboard.component';
import { FormationComponent } from './directeur/formation/formation.component';
import { AddModuleComponent } from './directeur/add-module/add-module.component';
import { ModuleComponent } from './directeur/module/module.component';
import { AddMatiereComponent } from './directeur/add-matiere/add-matiere.component';
import { ListesDirecteursComponent } from './directeur/listes-directeurs/listes-directeurs.component';
import { ListStudentsComponent } from './directeur/list-students/list-students.component';
import { AddFormationComponent } from './directeur/add-formation/add-formation.component';
import { DashboardProfComponent } from './enseignant/dashboard-prof/dashboard-prof.component';
import { CoursComponent } from './enseignant/cours/cours.component';
import { DetailCoursComponent } from './enseignant/detail-cours/detail-cours.component';
import { DocumentsCourComponent } from './enseignant/documents-cour/documents-cour.component';
import { LienssCourComponent } from './enseignant/lienss-cour/lienss-cour.component';
import { AddCoursComponent } from './enseignant/add-cours/add-cours.component';
import { AddLienCoursComponent} from './enseignant/add-lien-cours/add-lien-cours.component';
import { AddDocumentComponent} from './enseignant/add-document/add-document.component';
import { AddNotesComponent} from './enseignant/add-notes/add-notes.component';


// Espace etudiant
import { DashboardComponent as EtudiantDashboardComponent } from './Etudiant/dashboard/dashboard.component';
import { NotesComponent } from './Etudiant/notes/notes.component';
import { MatieresComponent } from './Etudiant/matieres/matieres.component';
import { CoursComponent as EtudiantCoursComponent } from './Etudiant/cours/cours.component';
import { CoursDetailsComponent } from './Etudiant/cours-details/cours-details.component';
import { DetailModuleComponent } from './directeur/detail-module/detail-module.component';





export const routes: Routes = [
     { path: 'login', component: LoginComponent },
     // { path: 'login-admin', component: LoginAdminComponent },

     //========================== espace directeur============
     { path: 'dashboard', component: DashboardComponent },
     { path: 'formation/:id/modules', component: ModuleComponent },
     { path: 'formation', component: FormationComponent },     
     { path: 'ajouter-module', component: AddModuleComponent },
     { path: 'detail-module', component: DetailModuleComponent },
     { path: 'ajouter-matiere', component: AddMatiereComponent },
     { path: 'List-etudiants', component: ListStudentsComponent },
     { path: 'List-directeurs', component: ListesDirecteursComponent },
     { path: 'ajouter-formation', component: AddFormationComponent },

     // =================Espace Professeur=================
     // dashboard Enseignant
     { path: 'enseignant-dashboard', component: DashboardProfComponent },
     // Cours par matiere de l enseignant
     { path: 'matiere/:id/cours', component: CoursComponent },
     // ajouter un cour à une matiere
     { path: 'enseignant/matiere/:id/cours/add', component: AddCoursComponent },
     // detail d un cour ( pour consulter les liens et documents de ce cour par le prof)
     { path: 'enseignant/cours/:id', component: DetailCoursComponent},
     // les liens d un cours
     { path: 'enseignant/liens-cours/:id', component: LienssCourComponent},
     // ajouter un lien cours
     { path: 'enseignant/ajouter-lien/:id', component: AddLienCoursComponent},
     //les documents d un cour
     { path: 'enseignant/documents-cours/:id', component: DocumentsCourComponent },
     //ajouter un document
     { path: 'enseignant/ajouter-document/:id', component: AddDocumentComponent},
     //ajouter les notes
     { path: 'enseignant/matiere/:id/add/notes', component:  AddNotesComponent},
//===========================================================================================

     //Espace Etudiant
     { path: 'etudiant/dashboard', component: EtudiantDashboardComponent },
     { path: 'notes', component: NotesComponent },
     { path: 'matieres/:id', component: MatieresComponent },
     { path: 'matieres/:matiereId/cours', component: EtudiantCoursComponent},
     { path: 'matieres/cours/:id', component: CoursDetailsComponent},

     { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
     imports: [RouterModule.forRoot(routes)],
     exports: [RouterModule]
})
export class AppRoutingModule { }
