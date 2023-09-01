import { NgModule } from '@angular/core';
import { SharedDataModule } from 'src/app/shared-data/shared-data.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module'
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent
  ],
  imports: [
    SharedDataModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
