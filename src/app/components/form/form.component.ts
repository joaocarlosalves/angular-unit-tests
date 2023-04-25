import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: ''
})
export class FormComponent {
  form: FormGroup;
  countries = ['USA', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Peru', 'Colombia', 'Chile', 'Ecuador', 'Uruguay'];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      country: ['', Validators.required],
      age: ['', Validators.required],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      zipCode: ['']
    });
  };
}
