import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogInputComponent } from './dialog-input/dialog-input.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogSelectComponent } from './dialog-select/dialog-select.component';


@NgModule({
  declarations: [
    DialogInputComponent,
    DialogSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [ ],
})

export class ModalModule { }
