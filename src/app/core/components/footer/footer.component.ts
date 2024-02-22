import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [
    MatToolbarModule
  ]
})
export class FooterComponent {}
