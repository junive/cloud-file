import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogNamingComponent } from './dialog-naming/dialog-naming.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogSelectingComponent } from './dialog-selecting/dialog-selecting.component';


@NgModule({
  declarations: [
    DialogNamingComponent,
    DialogSelectingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [ ],
})

export class DialogModule { }
