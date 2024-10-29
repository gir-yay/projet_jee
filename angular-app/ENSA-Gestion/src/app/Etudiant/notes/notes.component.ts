import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { NoteService } from '../services/note.service';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
 
export class NotesComponent  implements OnInit {
  notes: any[] = [];
  isDropdownOpen = false;
  isCoursesDropdownOpen = false;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(
      (data: any[]) => {
        this.notes = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des notes:', error);
      }
    );
  }
  


  toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleCoursesDropdown() {
    this.isCoursesDropdownOpen = !this.isCoursesDropdownOpen;
}

 
}
