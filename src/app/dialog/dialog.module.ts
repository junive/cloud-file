import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogSaveInputComponent } from './dialog-save-input/dialog-save-input.component';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from './dialog.service';

@NgModule({
  declarations: [
    DialogSaveInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  providers: [ ],
})

export class DialogModule { }
