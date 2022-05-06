import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { FileGooglePhotosService } from './service/file-google-photos.service';
import { FileLocalService } from './service/file-local.service';
import { FileGooglePhotosComponent, FileLocalComponent } from './file-explorer/file-explorer.childreen';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { FileHelper } from './file.helper';

@NgModule({
  declarations: [
    FileExplorerComponent,
    FileLocalComponent,
    FileGooglePhotosComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
   // FormsModule,
   // ReactiveFormsModule,
    
  ],
  providers: [
    FileHelper,
    FileLocalService,
    FileGooglePhotosService
  ],
  exports: [
    FileLocalComponent,
    FileGooglePhotosComponent,
  ],
})

export class FileModule {
  static injector: Injector;
  constructor(injector: Injector) {
    FileModule.injector = injector;
  } 
 }