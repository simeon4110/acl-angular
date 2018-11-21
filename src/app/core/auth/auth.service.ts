import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
}
