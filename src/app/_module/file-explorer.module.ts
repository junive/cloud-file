import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FileExplorerComponent } from '../file-explorer/file-explorer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    FileExplorerComponent,
  ],
  imports: [
    CommonModule,
    ScrollingModule
  ],
  exports: [
    FileExplorerComponent,
  ],
  providers: [
    
  ],

})
export class FileExplorerModule {}