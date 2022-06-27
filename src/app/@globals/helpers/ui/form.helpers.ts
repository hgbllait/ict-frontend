import { FormGroup, ValidationErrors } from '@angular/forms';
import { Injectable, Pipe} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormHelper {
  getFormValidationErrors(form: FormGroup) {

    const result = [];
    Object.keys(form.controls).forEach(key => {

      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({
            control: key,
            error: keyError,
            value: controlErrors[keyError]
          });
        });
      }
    });

    return result;
  }
}
