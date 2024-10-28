import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-listes-directeurs',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listes-directeurs.component.html',
  styleUrl: './listes-directeurs.component.css'
})
export class ListesDirecteursComponent implements OnInit {isPopupOpen = false;
  selectedFile: File | null = null;

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      console.log(this.selectedFile);
    }
    this.closePopup(); // Ferme la popup après l'upload
  }


  constructor() { }

  ngOnInit(): void {
    // SIDEBAR DROPDOWN LOGIC
   

    this.loadScript('../../../assets/js/table.js');
    this.loadScript('../../../assets/js/sidebar.js');

  }
  loadScript(src: string): void {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }
}