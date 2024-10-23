import { Component , OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-add-module',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './add-module.component.html',
  styleUrl: './add-module.component.css'
})
export class AddModuleComponent implements OnInit {
  
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
