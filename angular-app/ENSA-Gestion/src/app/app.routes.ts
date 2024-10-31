import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { DashboardComponent} from './directeur/dashboard/dashboard.component';
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
import { LienssCourComponent } from './lienss-cour/lienss-cour.component';
import { AddCoursComponent } from './enseignant/add-cours/add-cours.component';

export const routes: Routes = [
     { path: 'login', component: LoginComponent },
     { path: 'dashboard', component: DashboardComponent },
     { path: 'formation', component: FormationComponent },
     { path: 'ajouter-module', component: AddModuleComponent },
     { path: 'detail-module', component: ModuleComponent},
     { path: 'ajouter-matiere', component: AddMatiereComponent },
     { path: 'List-etudiants', component: ListStudentsComponent },
     { path: 'List-directeurs', component: ListesDirecteursComponent },
     { path: 'ajouter-formation', component: AddFormationComponent },
     { path: 'enseignant-dashboard', component: DashboardProfComponent },
     { path: 'enseignant-Cours', component: CoursComponent },
     { path: 'enseignant-ajouter-cours', component: AddCoursComponent },
     { path: 'detail-cours', component: DetailCoursComponent},
     { path: 'liens-cours', component: LienssCourComponent},
     { path: 'Documents-cours', component: DocumentsCourComponent },
     { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }