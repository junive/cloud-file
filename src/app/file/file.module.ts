import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from '../dialog/dialog.module';
import { DialogService } from '../dialog/dialog.service';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { FileManagerComponent } from './file-manager/file-manager.component';


@NgModule({
  declarations: [
    FileExplorerComponent,
    FileManagerComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule
  ],
  providers: [ ],
  exports: [
    FileExplorerComponent,
    FileManagerComponent,
  ],
})

export class FileManagerModule { }
