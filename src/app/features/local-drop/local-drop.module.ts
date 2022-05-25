import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalDropController } from '../../core/controllers/file/local-drop.controller';
import { LocalDropComponent } from './components/local-drop.component';
import { MyFileModule } from '../../shared-files/file.module';
import { Controller } from '../../core/controllers/abstract/controller';
import { FileRamStorage } from '../../core/storage/file-ram.storage';

@NgModule({
  declarations: [
    LocalDropComponent
  ],
  imports: [
    MyFileModule,
    RouterModule.forChild([{ path: '', component: LocalDropComponent }])
  ],
  providers: [
    FileRamStorage,
    { provide: Controller,  useClass: LocalDropController},
  ],
  exports: [
  ],
})

export class LocalDropModule {

}