import { Component, OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-add-matiere',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './add-matiere.component.html',
  styleUrl: './add-matiere.component.css'
})
export class AddMatiereComponent implements OnInit  {
  
  constructor() { }

  ngOnInit(): void {
    // SIDEBAR DROPDOWN LOGIC
   

    this.loadScript('assets/js/sidebar.js');

  }
  loadScript(src: string): void {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

}
