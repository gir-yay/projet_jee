import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cours-details',
  standalone: true,
  templateUrl: './cours-details.component.html',
  imports: [
    CommonModule,
    RouterModule, 
  ],
  styleUrls: ['./cours-details.component.css']
})
export class CoursDetailsComponent implements OnInit {
  coursId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.coursId = this.route.snapshot.paramMap.get('id');
    
  }
}
