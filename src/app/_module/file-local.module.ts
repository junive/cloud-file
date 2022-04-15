import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { FileExplorerModule } from './file-explorer.module';
import { FileLocalService } from '../_service/file-local.service';
import { FileLocalComponent } from '../file-local/file-local.component';
import { FileExplorerComponent } from '../file-explorer/file-explorer.component';


@NgModule({
  declarations: [
    FileLocalComponent
  ],
  imports: [
    FileExplorerModule, 
    BrowserModule, 
    FlexLayoutModule, 
    MatCardModule,
  ],
  providers: [
    FileExplorerComponent,
    FileLocalService
  ],
  exports: [
    FileLocalComponent
  ],
})

export class FileLocalModule { }
