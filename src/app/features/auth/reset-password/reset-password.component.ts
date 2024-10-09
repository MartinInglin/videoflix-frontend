import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Validation from '../../../utils/validation';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  passwordVisible: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
