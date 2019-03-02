import {AbstractControl} from '@angular/forms';

/**
 * Handles password validation.
 * @author Josh Harkema
 */
export class PasswordValidation {
  /**
   * Ensures password and password1 match.
   * @param AC the abstract control from the form.
   */
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
