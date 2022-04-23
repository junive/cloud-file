import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileLocalService } from './_service/file-local.service';
import { FileGPhotoService } from './_service/file-gphoto.service';
import { BrowserModule } from '@angular/platform-browser';
import { FileManagerModule } from './_module/file-manager.module';
import { DialogManagerModule } from './_module/dialog.module';
import { DialogManagerService } from './_service/dialog.service';
import { SimpleDialogComponent } from './dialog/simple-dialog/simple-dialog.component';

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
    DialogManagerService,
  ],
  bootstrap: [AppComponent],
  


})
export class AppModule { }
 