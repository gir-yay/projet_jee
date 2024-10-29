import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { ModuleService } from '../services/module.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit {
  modules: any[] = []; // Changez 'notes' en 'modules'

  constructor(private moduleService: ModuleService) {}

  ngOnInit(): void {
    this.moduleService.getModules().subscribe(
      (data: any[]) => {
        this.modules = data; // Assignez les données reçues aux modules
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des modules:', error);
      }
    );
  }
  

  isDropdownOpen = false;
  isCoursesDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleCoursesDropdown() {
    this.isCoursesDropdownOpen = !this.isCoursesDropdownOpen;
  }
}
