import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileLocalModule } from './_module/file-local.module';
import { FilePhotoModule } from './_module/file-photo.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FileLocalModule,
    FilePhotoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
