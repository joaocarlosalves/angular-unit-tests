import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent,
      fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReactiveFormsModule] });
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create form controls', () => {
    expect(component.form.contains('name')).toBeTrue();
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('birthDate')).toBeTrue();
    expect(component.form.contains('country')).toBeTrue();
    expect(component.form.contains('age')).toBeTrue();
    expect(component.form.contains('addressLine1')).toBeTrue();
    expect(component.form.contains('addressLine2')).toBeTrue();
    expect(component.form.contains('city')).toBeTrue();
    expect(component.form.contains('zipCode')).toBeTrue();
  });
});
