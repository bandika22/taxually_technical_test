import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  error$ = this.authService.getError();

  email = new FormControl<string>('', [Validators.required, Validators.email]);
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
    if(loginForm.valid){      
      this.authService.login(loginForm.controls.email.value, loginForm.controls.password.value);
    }
  }

  getErrorMessage(formControl: FormControl) {
    return this.authService.getErrorMessage(formControl);
  }

}
