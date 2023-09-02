import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';

export interface SignUpForm {
  firtName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  firstName = new FormControl<string>('', {nonNullable: true});
  lastName = new FormControl<string>('', {nonNullable: true});
  email = new FormControl<string>('', {nonNullable: true});
  password = new FormControl<string>('', {nonNullable: true});

  signUpForm: FormGroup<SignUpForm> = new FormGroup<SignUpForm>({
    firtName: this.firstName as FormControl<string>,
    lastName: this.lastName as FormControl<string>,
    email: this.email as FormControl<string>,
    password: this.password as FormControl<string>
  }, Validators.required);



  constructor(
    private authService: AuthService
  ){}

  signUp(signUpForm: FormGroup<SignUpForm>){
    if(this.signUpForm.valid){
      this.authService.signUp(signUpForm);
    }
  }

}
