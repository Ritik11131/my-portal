import { Component, Input, type OnInit, signal, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from "primeng/radiobutton";
import { ErrorMessagePipe } from "@/app/core/pipes/form/error-message.pipe";
import { SelectModule } from 'primeng/select';

export interface FormField {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  isRequired?: boolean;
  validate?: (value: string) => string | null;
  options?: any[];
}

export type FormData = {
  [K in string]: any;
};

@Component({
  selector: 'app-generic-form',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, TextareaModule, RadioButtonModule, ErrorMessagePipe, SelectModule],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.css'
})
export class GenericFormComponent implements OnInit {
  @Input() set fields(value: FormField[]) {
    this.formFields.set(value);
    this.initForm(); // Reinitialize form when fields change
  }

  @Input() set initialData(value: FormData | null) {
    if (value) {
      this._initialData = value;
      this.initForm(); // Reinitialize form when initial data changes
    }
  }

  @Output() formSubmit = new EventEmitter<FormData>();

  formFields = signal<FormField[]>([]);
  form!: FormGroup;
  submitButtonText = signal("Save");
  private _initialData: FormData | null = null;

  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const formGroup: any = {};

    // Ensure all fields from UI and initial data are considered
    const allFields = new Set([
      ...this.formFields().map((f) => f.name), // UI fields
      ...Object.keys(this._initialData || {}) // Initial data fields
    ]);

    allFields.forEach((key) => {
      const field = this.formFields().find((f) => f.name === key);
      const initialValue = this._initialData ? this._initialData[key] : "";
      const isRequired = field?.isRequired || false;

      // Add custom validator if provided
      const validators = isRequired ? [Validators.required] : [];
      if (field?.validate) {
        validators.push(this.createCustomValidator(field.validate));
      }

      formGroup[key] = [initialValue, validators];
    });

    this.form = this.formbuilder.group(formGroup);
  }

  // Helper function to create a custom validator
  createCustomValidator(validateFn: (value: string) => string | null) {
    return (control: AbstractControl): ValidationErrors | null => {
      const errorMessage = validateFn(control.value || '-');
      return errorMessage ? { custom: errorMessage } : null;
    };
  }

  onSubmit() {
    if (this.form.valid) {
      const updatedData = { ...this._initialData, ...this.form.value };
      console.log(updatedData, 'data');
      this.formSubmit.emit(updatedData);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control?.errors) {
      if (control.errors['custom']) {
        return control.errors['custom']; // Return custom error message
      }
      if (control.errors['required']) {
        return "This field is required";
      }
    }
    return "";
  }
}