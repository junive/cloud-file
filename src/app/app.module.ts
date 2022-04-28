import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileLocalController } from './file/_controller/file-local.controller';
import { FileGooglePhotosController } from './file/_controller/file-google-photos.controller';
import { BrowserModule } from '@angular/platform-browser';
import { FileManagerModule } from './file/file.module';
import { ModalService } from './modal/modal.service';

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
    ModalService,
  ],
  bootstrap: [AppComponent],
  


})
export class AppModule { }
 