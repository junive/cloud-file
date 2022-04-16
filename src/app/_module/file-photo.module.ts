import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FileExplorerModule } from './file-explorer.module';
import { FilePhotoService } from '../_service/file-photo.service';
import { FilePhotoComponent } from '../file-photo/file-photo.component';
import { FileExplorerComponent } from '../file-explorer/file-explorer.component';


@NgModule({
  declarations: [
    FilePhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileExplorerModule, 
    FlexLayoutModule, 
    MatCardModule
  ],
  providers: [
    FileExplorerComponent,
    FilePhotoService
  ],
  
  exports: [
    FilePhotoComponent
  ],
})

export class FilePhotoModule { }
