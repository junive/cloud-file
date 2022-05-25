import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ExplorerFileComponent } from './components/explorer/explorer.component';
import { PathNavComponent } from './components/path-nav/path-nav.component';
import { RenameFileComponent } from './components/forms/rename-file.component';
import { CreateFolderComponent } from './components/forms/create-folder.component';
import { MoveOptionFileComponent } from './components/forms/move-option.component';
import { MySharedModule } from '../shared/shared.module';
import { FileQueryService } from './services/file-query.service';
import { FileFormService } from './services/file-form.service';
import { FormService } from '../shared/services/form.service';
import { FileService } from './services/file-controller.service';

@NgModule({
  declarations: [
    ExplorerFileComponent,
    PathNavComponent,
    ContextMenuComponent,

    RenameFileComponent,
    CreateFolderComponent,
    MoveOptionFileComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    ReactiveFormsModule,
    MySharedModule
  ],
  exports: [
    ExplorerFileComponent,
    PathNavComponent,
    ContextMenuComponent,

  ],
  providers: [ 
    FormService,
    FileService,
    FileQueryService,
    FileFormService, 
  ]
})
export class MyFileModule { }
