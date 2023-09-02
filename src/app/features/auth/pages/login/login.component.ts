import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  users$ = this.authService.getUsers().pipe(
    map(users => {
    })
  );

  email = new FormControl<string>('', Validators.required);
  password = new FormControl<string>('', Validators.required);

  loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    email: this.email as FormControl<string>,
    password: this.password as FormControl<string>
  }, Validators.required);

  constructor(
    private authService: AuthService
  ){
    this.authService.loadUsers();
  }

  login(loginForm: FormGroup<LoginForm>){
    if(loginForm.value.email && loginForm.value.password){
      this.authService.login(loginForm.value.email, loginForm.value.password)
    }
  }

}
