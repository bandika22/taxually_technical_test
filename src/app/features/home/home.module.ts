import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataModule } from 'src/app/shared-data/shared-data.module';
import { FileManagerComponent } from './pages/file-manager/file-manager.component';



@NgModule({
  declarations: [
    FileManagerComponent
  ],
  imports: [
    CommonModule,
    SharedDataModule
  ]
})
export class HomeModule { }
