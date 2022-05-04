import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileLocalController } from './file/controller/file-local.controller';
import { FileGooglePhotosController } from './file/controller/file-google-photos.controller';
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
    FileLocalController,
    FileGooglePhotosController,
    DialogService,
  ],
  bootstrap: [AppComponent],
  


})
export class AppModule { }
 