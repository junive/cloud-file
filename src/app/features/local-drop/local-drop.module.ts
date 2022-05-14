import { NgModule } from '@angular/core';
import { LocalDropController } from '../../core/http/file/local-drop.controller';
import { LocalDropComponent } from './components/local-drop.component';
import { FileService } from 'src/app/shared/services/file.service';
import { MyFileModule } from 'src/app/shared/modules/file.module';
import { RouterModule, Routes } from '@angular/router';


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
    LocalDropController,
    { provide: FileService,  deps : [LocalDropController] }
 
  ],
  exports: [
    RouterModule
  ],
})

export class LocalDropModule {

}