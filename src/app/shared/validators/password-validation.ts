import {AbstractControl} from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const password1 = AC.get('password1').value;

    if (password !== password1) {
      AC.get('password1').setErrors({MatchPassword: true});
    } else {
      return null;
    }
  }
}
