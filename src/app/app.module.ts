import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileLocalComponent } from './file-local/file-local.component';
import { FileLocalModule } from './_module/file-local.module';
import { FilePhotoModule } from './_module/file-photo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FileLocalModule,
    FilePhotoModule,
  ],
  providers: [FileLocalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
