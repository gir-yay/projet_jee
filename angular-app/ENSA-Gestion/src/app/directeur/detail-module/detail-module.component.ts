import { Component } from '@angular/core';
import { FormationComponent } from "../formation/formation.component";

@Component({
  selector: 'app-detail-module',
  standalone: true,
  imports: [FormationComponent],
  templateUrl: './detail-module.component.html',
  styleUrl: './detail-module.component.css'
})
export class DetailModuleComponent {

}
