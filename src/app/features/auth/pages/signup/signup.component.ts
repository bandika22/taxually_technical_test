import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../models/user';

export interface UserForm {
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

  firstName = new FormControl<string>('');
  lastName = new FormControl<string>('');
  email = new FormControl<string>('');
  password = new FormControl<string>('');

  signUpForm: FormGroup<UserForm> = new FormGroup<UserForm>({
    firtName: this.firstName as FormControl<string>,
    lastName: this.lastName as FormControl<string>,
    email: this.email as FormControl<string>,
    password: this.password as FormControl<string>
  });



  constructor(
    private authService: AuthService
  ){}

  signUp(signUpForm: FormGroup<UserForm>){
    this.authService.signUp(signUpForm.value as User);
  }

}
