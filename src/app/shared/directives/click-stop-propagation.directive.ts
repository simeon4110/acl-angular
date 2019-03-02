import {Directive, HostListener} from '@angular/core';

/**
 * Prevents unwanted cascading of click events.
 * @author Josh Harkema
 */
@Directive({
  selector: '[appClickStopPropagation]'
})
export class ClickStopPropagationDirective {

  constructor() {
  }

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
  }
}
