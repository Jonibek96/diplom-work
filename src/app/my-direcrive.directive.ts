import {Directive, HostBinding, HostListener} from '@angular/core';


@Directive({
  selector: '[appMyDirecrive]'
})

export class MyDirecriveDirective {
  @HostBinding('style.backgroundColor') background: string;

  constructor() {
  }

  @HostListener('click') click() {
    this.background = 'blue';
  }
}

