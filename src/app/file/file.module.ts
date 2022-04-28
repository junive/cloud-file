import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '../modal/modal.module';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { FileExplorerService } from './_service/file-explorer.service';

@NgModule({
  declarations: [
    FileExplorerComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    FormsModule, 
    ModalModule
  ],
  providers: [
    
  ],
  exports: [
    FileExplorerComponent
  ],
})

export class FileManagerModule { }