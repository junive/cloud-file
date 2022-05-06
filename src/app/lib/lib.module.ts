import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input/input-text/input-text.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InputTextComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputTextComponent
  ]
})
export class LibModule { }
