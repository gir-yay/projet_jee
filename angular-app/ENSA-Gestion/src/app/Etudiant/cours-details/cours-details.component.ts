import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-cours-details',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './cours-details.component.html',
  styleUrl: './cours-details.component.css'
})
export class CoursDetailsComponent {
  isDropdownOpen = false;



  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
