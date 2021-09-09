import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDownOrder]'
})
export class DropDownOrderDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen
  }
  constructor() { }

}
