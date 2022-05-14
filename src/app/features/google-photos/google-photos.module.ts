import { NgModule } from '@angular/core';
import { GooglePhotosRoutingModule, } from './google-photos-routing.module';
import { GooglePhotosComponent } from './components/google-photos.component';
import { GooglePhotosController } from 'src/app/core/http/file/google-photos.controller';
import { FileService } from 'src/app/shared/services/file.service';
import { MyFileModule } from 'src/app/shared/modules/file.module';

@NgModule({
  declarations: [
    GooglePhotosComponent
  ],
  imports: [
   // FileModule,
    MyFileModule,
    GooglePhotosRoutingModule
   // FormsModule,
   // ReactiveFormsModule,
   
  ],
  providers: [
    GooglePhotosController,
    { provide: FileService,  deps : [GooglePhotosController] }
  ],
  exports: [
    
  ],
})

export class GooglePhotosModule {

 }