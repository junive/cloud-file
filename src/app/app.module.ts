import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileLocalComponent } from './file-local/file-local.component';
import { FileLocalModule } from './_module/file-local.module';
import { FilePhotoModule } from './_module/file-photo.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FileLocalModule,
    FilePhotoModule,
    NgbModule,
  ],
  providers: [FileLocalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
