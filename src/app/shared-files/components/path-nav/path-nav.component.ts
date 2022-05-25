import { Component, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { MyFolder } from '../../models/my-file';
import { FileService } from '../../services/file-controller.service';

@Component({
  selector: "my-path-nav",
  templateUrl: "./path-nav.html",
  styleUrls: ['../../../../assets/scss/files/path-nav.css']
  //changeDetection: ChangeDetectionStrategy.OnPush,
  //providers: [  ],
})
export class PathNavComponent  {
  pathNav: MyFolder[] = [];

  constructor( public service: FileService,
               private currentRoute: ActivatedRoute,
               private route: Router ) { }

  ngAfterViewInit () { }

  addFolderEmit() {
    this.service.addFolder();
  }

  openFolderEmit(folderId: string) {
    this.route.navigate(["../"+folderId], { relativeTo: this.currentRoute})
   // this.service.openFolder(folderId);
  }


}


