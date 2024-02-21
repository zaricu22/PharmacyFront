import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // dependencies(imports) are in app.module
})
export class AppComponent {
  title = 'PharmacyFront';

  messageFromHeader: boolean = false;

  receiveMessageFromHeader($event: boolean) {
    this.messageFromHeader = $event;
  }
}
