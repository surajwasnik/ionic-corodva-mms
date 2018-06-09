import { Component } from '@angular/core';

@Component({
  selector: 'closer-menu',
  templateUrl: 'closer-menu.html'
})
export class CloserMenuComponent {

  text: string;

  constructor() {
    console.log('Hello CloserMenuComponent Component');
    this.text = 'Hello World';
  }

}
