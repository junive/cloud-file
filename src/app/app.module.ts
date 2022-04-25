import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileLocalService } from './_service/file-local.service';
import { FileGPhotoService } from './_service/file-gphoto.service';
import { BrowserModule } from '@angular/platform-browser';
import { FileManagerModule } from './file/file.module';
import { DialogService } from './dialog/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    FileManagerModule
  ],
  providers: [
    FileLocalService,
    FileGPhotoService,
    DialogService,
  ],
  bootstrap: [AppComponent],
  


})
export class AppModule { }
 