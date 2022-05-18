import { NgModule } from '@angular/core';
import { GooglePhotosRoutingModule, } from './google-photos-routing.module';
import { GooglePhotosComponent } from './components/google-photos.component';
import { GooglePhotosController } from 'src/app/core/http/file/google-photos.controller';
import { FileService } from '../../shared/services/file.service';
import { MyFileModule } from '../../shared/modules/file.module';
import { FormListener } from 'src/app/shared/services/form.listener';
import { FileFormHelper } from 'src/app/shared/services/helper/file-form.helper';

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