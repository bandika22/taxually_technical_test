import { NgModule } from '@angular/core';
import { SharedDataModule } from 'src/app/shared-data/shared-data.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module'
import { SignupComponent } from './pages/signup/signup.component';

import { RegistrationEffects } from './store/effect/auth.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { signupReducer } from './store/reducer/auth.reducer';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent
  ],
  imports: [
    SharedDataModule,
    AuthRoutingModule,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
