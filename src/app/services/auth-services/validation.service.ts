import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
    const config: {[key: string]: string}  = {
      required: 'AUTHFORMS.errors.noemptyfield',
      requiredError: 'AUTHFORMS.errors.noemptyfield',
      invalidEmailAddress: 'AUTHFORMS.errors.invalidmail',
      invalidPassword: 'AUTHFORMS.errors.passwordconstruct',
      mustMatch: 'AUTHFORMS.errors.mustmatchpassword',
      invalidDate: 'DDIAFORMS.errors.invalidDate',
      invalidFrom: 'DDIAFORMS.errors.invalidFrom',
      invalidTo: 'DDIAFORMS.errors.invalidTo',

      // invalidPassword:
      //   'Invalid password. Password must be at least 8 characters long and least 100, contain a number, and special character.',
      // minlength: `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static requiredValidator(control: FormControl): {[key: string]: boolean}{
    if (control.value.match(/[^\s]+/)){
      return null;
    }
    return {requiredError: true};
  }

  static emailValidator(control: FormControl): {[key: string]: boolean} {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(control: FormControl): {[key: string]: boolean} {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*.,;/])[a-zA-Z0-9!@#$%^&*]{8,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  static mustMatch(controlName: string, matchingControlName: string): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  static DateValidator(control: FormControl): { [ key: string]: boolean} | null {
    const date = control.value;
    const from = date[0];
    const to = date[1];
    if (from == null && to == null){
      return null;
    }
    if (from == null || to == null){
      return {
        invalidDate: true
      };
    }
    if (new Date(from) < new Date() ){
        return {
            invalidFrom: true
        };
    }
    if (new Date(from) > new Date(to)){
      return {
        invalidTo: true
      };
    }
    return null;
    }


}
