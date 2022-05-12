import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { GooglePhotosFileService } from '../../core/http/file/google-photos.service';
import { LocalFileService } from '../../core/http/file/local.service';
import { FileQueryHelper } from './helper/file-query.helper';
import { GooglePhotosFileComponent } from './pages/google-photos/google-photos.component';
import { LocalFileComponent } from './pages/local/local.component';
import { ExplorerFileComponent } from './component/explorer/explorer.component';
import { HomeFileComponent } from './home/home.component';
import { HomeFileRoutingModule } from './file-routing.module';
import { FileDialogHelper } from './helper/file-dialog.helper';

@NgModule({
  declarations: [
    HomeFileComponent,
    ExplorerFileComponent,
    LocalFileComponent,
    GooglePhotosFileComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    HomeFileRoutingModule
   // FormsModule,
   // ReactiveFormsModule,
    
  ],
  providers: [
    FileQueryHelper,
    FileDialogHelper,
    LocalFileService,
    GooglePhotosFileService,
  ],
  exports: [

  ],
})

export class FileModule {
  static injector: Injector;
  constructor(injector: Injector) {
    FileModule.injector = injector;
  } 
 }