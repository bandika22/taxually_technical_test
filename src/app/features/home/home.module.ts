import { NgModule } from '@angular/core';
import { SharedDataModule } from 'src/app/shared-data/shared-data.module';
import { FileManagerComponent } from './pages/file-manager/file-manager.component';
import { DndDirective } from 'src/app/core/directives/dnd.directive';



@NgModule({
  declarations: [
    FileManagerComponent,
    DndDirective
  ],
  imports: [
    SharedDataModule
  ]
})
export class HomeModule { }
