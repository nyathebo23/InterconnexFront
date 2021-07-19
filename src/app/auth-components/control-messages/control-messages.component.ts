import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../services/auth-services/validation.service';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent  {

  @Input() control!: AbstractControl;
  constructor() {}

  get errorMessage(): string {
    if (this.control){
      for (const propertyName in this.control.errors) {
        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          this.control.dirty
        ) {
          return ValidationService.getValidatorErrorMessage(
            propertyName,
            this.control.errors[propertyName]
          );
        }
      }
    }
    return null;
  }
}
