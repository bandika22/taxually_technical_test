import { NgModule } from '@angular/core';
import { SharedDataModule } from 'src/app/shared-data/shared-data.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedDataModule
  ]
})
export class LoginModule { }
