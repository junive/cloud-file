import { Component, HostListener, Input } from '@angular/core'
import { MyFile } from 'src/app/shared/models/file/my-file';
import { MyFileConfig } from 'src/app/shared/models/file/my-file-config';
import { FileService } from 'src/app/shared/services/file.service';
import { MySvgAsset } from '../../../../../assets/svg';

@Component({
  selector: "my-explorer-file",
  templateUrl: "./explorer.html",
  styleUrls: ['../../../../../assets/scss/file.css']
  //changeDetection: ChangeDetectionStrategy.OnPush,
  //providers: [  ],
})
export class ExplorerFileComponent  {
 // selectedIds: string[] = [];
  mysvg = MySvgAsset;
  files: MyFile[] = [];
  
  //@Input() service!: FileService;
  @Input() config: MyFileConfig = {};

  constructor( public service: FileService ) { }


  ngOnInit() {
   // if (!this.config.initFiles) return ;
    
    this.service.files$.subscribe(files => {
      this.files = [...files];
      //this.cdRef.detectChanges();
    }) 
    //this.service.refreshFiles();
  }
 
  ngAfterViewInit () { 
    console.log((Date.now() - this.service.timeStartA))
  }

  openFileEmit(fileId: string) {
    this.service.openFile(fileId);
  }

  openFolderEmit(folderId: string) {
    this.service.openFolder(folderId);
  }

  openMenuContext(event: MouseEvent, fileId:string) {
    event.preventDefault();
    this.service.select$.next( {
      ids: [fileId], 
      menu: { event : event}
    });
  }


}


