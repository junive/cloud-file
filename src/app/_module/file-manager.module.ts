import { NgModule } from '@angular/core';
import { FileManagerComponent } from '../file-manager/file-manager.component';
import { FileExplorerModule } from './file-explorer.module';
import { FileManagerService } from '../_service/file-manager.service';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    FileManagerComponent
  ],
  imports: [
    FileExplorerModule
  ],
  providers: [
    FileManagerService
  ],
  exports: [
    FileManagerComponent
  ],
})

export class FileManagerModule { }
