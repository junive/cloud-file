import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '../dialog/dialog.module';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { FileHelper } from './file.helper';

@NgModule({
  declarations: [
    FileExplorerComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule, 
    DialogModule
  ],
  providers: [
    FileHelper
  ],
  exports: [
    FileExplorerComponent
  ],
})

export class FileManagerModule { }