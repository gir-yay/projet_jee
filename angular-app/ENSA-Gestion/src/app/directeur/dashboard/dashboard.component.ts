
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

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