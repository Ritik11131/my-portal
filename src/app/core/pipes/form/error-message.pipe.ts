import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  standalone: true,
  pure: false
})
export class ErrorMessagePipe implements PipeTransform {
  transform(control: AbstractControl | null, fieldName: string, formFields: any[]): string {    
    if (!control || !control.errors) {
      return '';
    }

    const field = formFields.find((f) => f.name === fieldName);
    if (!field) {
      return '';
    }

    if (control.errors['custom']) {
      return control.errors['custom']; // Return custom error message
    }
    if (control.errors['required']) {
      return "This field is required";
    }

    return '';
  }
}