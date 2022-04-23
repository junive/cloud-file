import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FileManagerComponent } from '../file-manager/file-manager.component';
import { FileExplorerModule } from './file-explorer.module';


@NgModule({
  declarations: [
    FileManagerComponent,
  ],
  imports: [
    CommonModule,
    FileExplorerModule
  ],
  providers: [ ],
  exports: [
    FileManagerComponent
  ],
})

export class FileManagerModule { }
