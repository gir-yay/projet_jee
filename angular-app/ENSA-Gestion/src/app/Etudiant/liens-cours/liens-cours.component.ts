import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../services/module.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-liens-cours',
  standalone: true,
  templateUrl: './liens-cours.component.html',
  styleUrls: ['./liens-cours.component.css'],
  imports: [CommonModule, RouterModule]
})
export class LiensCoursComponent implements OnInit {
  coursId: number = 0;
  coursNom: string = ''; 
  displayedliens: any[] = []; 
  sortAsc = true;

  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    // Get coursId from route params and load course data
    this.route.paramMap.subscribe(params => {
      this.coursId = +params.get('id')!;
      this.loadLiens();
      this.loadCoursNom();
    });
  }

  // Fetch links related to the coursId
  loadLiens(): void {
    this.moduleService.getLiensByCoursId(this.coursId).subscribe(
      data => {
        this.displayedliens = data; // Update displayed links
      },
      error => console.error('Error fetching links', error)
    );
  }
  
 // Search for documents based on input
 searchTable(event: Event) {
  const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
  this.displayedliens = this.displayedliens.filter(lien => 
    lien.lien.toLowerCase().includes(searchValue)
  );
}
// Sort links by specified column
sortTable(column: string) {
  this.sortAsc = !this.sortAsc; // Toggle sort direction
  this.displayedliens.sort((a, b) => {
    const comparison = a[column].localeCompare(b[column]); // Use localeCompare for string comparison
    return this.sortAsc ? comparison : -comparison; // Sort based on the direction
  });
}

  loadCoursNom(): void {
    this.moduleService.getCoursById(this.coursId).subscribe(
      data => {
        this.coursNom = data.nom; // Ensure this method is defined correctly
      },
      error => console.error('Error fetching course name', error)
    );
  }
}
