import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { ModuleService } from '../services/module.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Corrected to styleUrls
})
export class DashboardComponent implements OnInit {
  modules: any[] = []; 
  matieres: any[] = [];
  isDropdownOpen = false;

  constructor(private moduleService: ModuleService) {}

  ngOnInit(): void {
    this.moduleService.getModules().subscribe(
      (data: any[]) => {
        this.modules = data; 
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des modules:', error);
      }
    );
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  
}
