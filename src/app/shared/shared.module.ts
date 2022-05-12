import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './components/input/input-text/input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogFooterComponent } from './components/dialog/footer.component';
import { DialogHeaderComponent } from './components/dialog/header.component';
import { NamingDialogComponent } from './components/dialog/naming/naming.component';
import { SelectingDialogComponent } from './components/dialog/selecting/selecting.component';

@NgModule({
  declarations: [
    InputTextComponent,
    DialogHeaderComponent,
    DialogFooterComponent,
    NamingDialogComponent,
    SelectingDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [
    InputTextComponent
  ]
})
export class SharedModule { }
