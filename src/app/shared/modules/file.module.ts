import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContextMenuComponent } from '../components/file/context-menu/context-menu.component';
import { ExplorerFileComponent } from '../components/file/explorer/explorer.component';
import { PathNavComponent } from '../components/file/path-nav/path-nav.component';
import { NamingFileComponent } from '../components/file/forms/naming.component';
import { RenameFileComponent } from '../components/file/forms/rename-file.component';
import { CreateFolderComponent } from '../components/file/forms/create-folder.component';
import { MoveOptionFileComponent } from '../components/file/forms/move-option.component';
import { MySharedModule } from './shared.module';
import { FileQueryHelper } from '../services/helper/file-query.helper';
import { FileFormHelper } from '../services/helper/file-form.helper';
import { FormListener } from '../listeners/form.listener';

@NgModule({
  declarations: [
    ExplorerFileComponent,
    PathNavComponent,
    ContextMenuComponent,

    NamingFileComponent,
    RenameFileComponent,
    CreateFolderComponent,
    MoveOptionFileComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    MySharedModule

  ],
  exports: [
    ExplorerFileComponent,
    PathNavComponent,
    ContextMenuComponent,

  ],
  providers: [ 
    FormListener,
    FileQueryHelper,
    FileFormHelper,
   
  ]
})
export class MyFileModule {

 }
