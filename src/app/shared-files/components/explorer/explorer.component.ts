import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { MyFile } from '../../models/my-file';
import { FileService } from '../../services/file-controller.service';
import { MySvgAsset } from '../../../../assets/svg';

@Component({
  selector: "my-explorer-file",
  templateUrl: "./explorer.html",
  styleUrls: ['../../../../assets/scss/files/explorer.css']
})
export class ExplorerFileComponent  {
  mysvg = MySvgAsset;
  files: MyFile[] = [];

  constructor( public service: FileService,
               private currentRoute: ActivatedRoute,
               private route: Router ) { }

  ngOnInit() {
    this.currentRoute.paramMap.subscribe((params) => {
      const driveId: string = params.get("driveId") ?? "";
      if (driveId === "home")  return this.service.openFolder();
      this.service.getFile$(driveId).subscribe( (folder: MyFile) =>  {
        if (folder)  return this.service.openFolder(driveId);
        this.route.navigate(["../home"], { relativeTo: this.currentRoute});
      })
    });
    this.service.files$.subscribe(files => {
      this.files = [...files];
    });
  }
 
  ngAfterViewInit () { 
    console.log((Date.now() - this.service.timeStartA))
  }

  openFileEmit(fileId: string) {
    this.service.openFile(fileId);
  }

  openFolderEmit(folderId: string) {
    this.route.navigate(["../"+folderId], { relativeTo: this.currentRoute})
    //this.service.openFolder(folderId);
  }

  openMenuContext(event$: MouseEvent, fileId:string) {
    event$.preventDefault();
    this.service.select$.next( {
      ids: [fileId], 
      menu: { mouse$ : event$}
    });
  }
  
}


