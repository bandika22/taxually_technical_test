import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule } from "@angular/forms";

import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

const modules = [
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
  CommonModule
];

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [...modules]
})
export class SharedDataModule { }
