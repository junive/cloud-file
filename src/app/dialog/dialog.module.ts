import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogNamingComponent } from './dialog-naming/dialog-naming.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogSelectingComponent } from './dialog-selecting/dialog-selecting.component';
import { LibModule } from '../lib/lib.module';
import { DialogHeaderComponent } from './core/dialog-header.component';
import { DialogFooterComponent } from './core/dialog-footer.component';
import { DialogCreateFolderComponent, DialogRenameFileComponent } from './dialog-naming/dialog-naming.childreen';
import { DialogSelectingMoveComponent } from './dialog-selecting/dialog-selecting.childreen';


@NgModule({
  declarations: [
    DialogHeaderComponent,
    DialogFooterComponent,
    DialogNamingComponent,
    DialogSelectingComponent,
    DialogRenameFileComponent,
    DialogCreateFolderComponent,
    DialogSelectingMoveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LibModule
  ],
  providers: [ ],
})

export class DialogModule { }
