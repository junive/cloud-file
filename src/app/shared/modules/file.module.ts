import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContextMenuComponent } from '../components/file/context-menu/context-menu.component';
import { ExplorerFileComponent } from '../components/file/explorer/explorer.component';
import { PathNavComponent } from '../components/file/path-nav/path-nav.component';

@NgModule({
  declarations: [
    ExplorerFileComponent,
    PathNavComponent,
    ContextMenuComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
  ],
  exports: [
    ExplorerFileComponent,
    PathNavComponent,
    ContextMenuComponent
  ]
})
export class MyFileModule {

 }
