import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { DashboardComponent} from './directeur/dashboard/dashboard.component';
import { FormationComponent } from './directeur/formation/formation.component';
import { AddModuleComponent } from './directeur/add-module/add-module.component'; 
import { ModuleComponent } from './directeur/module/module.component';
import { AddMatiereComponent } from './directeur/add-matiere/add-matiere.component'; 
import { ListStudentsComponent } from './directeur/list-students/list-students.component';
import { AddFormationComponent } from './directeur/add-formation/add-formation.component';

export const routes: Routes = [
     { path: 'login', component: LoginComponent },
     { path: 'dashboard', component: DashboardComponent },
     { path: 'formation', component: FormationComponent },
     { path: 'ajouter-module', component: AddModuleComponent },
     { path: 'detail-module', component: ModuleComponent},
     { path: 'ajouter-matiere', component: AddMatiereComponent },
     { path: 'List-etudiants', component: ListStudentsComponent },
     { path: 'ajouter-formation', component: AddFormationComponent },
     { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }