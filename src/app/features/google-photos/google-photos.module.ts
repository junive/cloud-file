import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GooglePhotosComponent } from './components/google-photos.component';
import { GooglePhotosController } from '../../core/controllers/file/google-photos.controller';
import { MyFileModule } from '../../shared-files/file.module';
import { Controller } from '../../core/controllers/abstract/controller';
import { FileRamStorage } from '../../core/storage/file-ram.storage';


@NgModule({
  declarations: [
    GooglePhotosComponent
  ],
  imports: [
    MyFileModule,
    RouterModule.forChild([{ path: '', component: GooglePhotosComponent }])
  ],
  providers: [
    FileRamStorage,
    { provide: Controller,  useClass: GooglePhotosController },
  ],
})

export class GooglePhotosModule { }