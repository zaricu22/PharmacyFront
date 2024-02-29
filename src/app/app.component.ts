import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PharmacyFront';

  messageFromHeader: boolean = false;

  receiveMessageFromHeader($event: boolean) {
    this.messageFromHeader = $event;
  }
}
