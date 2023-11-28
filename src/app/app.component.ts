import { Component } from '@angular/core';

import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleClass]'
})
export class ToggleClassDirective {
  @HostBinding('class.active') isActive = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    const allBoxes = document.querySelectorAll('.question__box');

    allBoxes.forEach(box => {
      if (box !== this.el.nativeElement) {
        this.renderer.removeClass(box, 'active');
      }
    });

    this.isActive = !this.isActive;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Guru';
}
