import {EventEmitter, Injectable, Input, Output} from '@angular/core';

/**
 * Handles routing for the loading bar; the loading bar is defined in the nav component, this
 * just manages the event emitter.
 * @author Josh Harkema
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {
  @Output() isLoading: EventEmitter<Boolean> = new EventEmitter();

  constructor() {
    this.isLoading.emit(false);
  }

  @Input()
  public setLoading(loading: boolean): void {
    this.isLoading.emit(loading);
  }
}
