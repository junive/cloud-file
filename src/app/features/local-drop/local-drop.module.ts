import { NgModule } from '@angular/core';
import { LocalDropController } from '../../core/http/file/local-drop.controller';
import { LocalDropComponent } from './components/local-drop.component';
import { FileService } from '../../shared/services/file.service';
import { MyFileModule } from '../../shared/modules/file.module';
import { RouterModule, Routes } from '@angular/router';
import { Controller } from 'src/app/core/abstract/controller';
import { FileQueryHelper } from 'src/app/shared/services/helper/file-query.helper';
import { FileFormHelper } from 'src/app/shared/services/helper/file-form.helper';
import { DialogListener } from 'src/app/shared/services/dialog.listener';


/* const fileServiceFactory = (controller: MyFileController) => {
  return new FileService(controller);
} */
const routes: Routes = [ ];

@NgModule({
  declarations: [
    LocalDropComponent
  ],
  imports: [
   // FileModule,
    MyFileModule,
    RouterModule.forChild([{ path: '', component: LocalDropComponent }])
    //LocalDropRoutingModule
   // FormsModule,
   // ReactiveFormsModule,
   
   
  ],
  providers: [
    
    {
      provide: Controller,
      useClass: LocalDropController,

    },
    DialogListener,
    FileQueryHelper,
    FileFormHelper,
   
    FileService,

  ],
  exports: [
    RouterModule
  ],
})

export class LocalDropModule {

}