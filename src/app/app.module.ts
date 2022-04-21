import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileLocalComponent } from './file-local/file-local.component';
import { FileLocalModule } from './_module/file-local.module';
import { FilePhotoModule } from './_module/file-photo.module';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileManagerModule } from './_module/file-manager.module';

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    FileManagerModule,
    FileLocalModule,
    FilePhotoModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
