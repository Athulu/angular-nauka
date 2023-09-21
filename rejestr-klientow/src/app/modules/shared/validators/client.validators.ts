/* eslint-disable prettier/prettier */
import { ValidatorFn } from '@angular/forms';
import { postcodeValidator } from './postcode.validator';

export class ClientValidators {
  static postcode(): ValidatorFn {
    return postcodeValidator();
  }
}
