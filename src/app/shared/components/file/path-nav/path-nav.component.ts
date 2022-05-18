import { Component, Input } from '@angular/core'
import { MyFolder } from '../../../models/file/my-file';
import { FileService } from '../../../services/file.service';

@Component({
  selector: "my-path-nav",
  templateUrl: "./path-nav.html",
 // styleUrls: ['../../../../../assets/scss/file.css']
  //changeDetection: ChangeDetectionStrategy.OnPush,
  //providers: [  ],
})
export class PathNavComponent  {
  pathNav: MyFolder[] = [];

  constructor( public service: FileService ) { }

  ngOnInit() {
   /* this.service.pathNav$.subscribe(pathNav => {
      this.pathNav = [...pathNav];
      //this.cdRef.detectChanges();
    })
    this.service.refreshPathNav();
    */
  }

  ngAfterViewInit () { 
    //console.log(this.explo);
  }

  addFolderEmit() {
    this.service.addFolder();
  }
  openFolderEmit(folderId: string) {
    this.service.openFolder(folderId);
  }


}


