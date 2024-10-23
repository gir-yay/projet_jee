import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.css'
})
export class ListStudentsComponent   implements OnInit {

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