import { Component } from '@angular/core';
import { MatListModule } from "@angular/material/list";

@Component({
  standalone: true,
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.css'],
  imports:[
    MatListModule
  ]
})
export class AboutViewComponent {}
