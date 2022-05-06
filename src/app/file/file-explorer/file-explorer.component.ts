import { Component, Input, HostListener } from '@angular/core'
import { MySvgAsset } from 'src/assets/svg';
import { MyFileConfig } from '../model/my-file-config';
import { FileExplorerAbstract } from './file-explorer.abstract';
import { FileService } from '../service/file.service';

@Component({
  //selector: "my-file-explorer",
  template: '',
  //styleUrls: ['./file-explorer.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  //providers: [  ],
})

export class FileExplorerComponent extends FileExplorerAbstract {
  selectedIds: string[] = [];
  mysvg = MySvgAsset;

  @Input() config: MyFileConfig = {};

  menu: any = {
    context: { hide: true, top: 0, left: 0  },
    move: { hide: true, top: 0, left: 0 }
  }

  constructor(
    service: FileService
    //cdRef: ChangeDetectorRef
  ) { 
    super(service);
  }

  private timeStartA:any; 

  ngOnInit() { 
   
    this.timeStartA = Date.now();
    if (this.config.initFiles) super.initFiles();
  }

  ngAfterViewInit () { 
    console.log((Date.now() - this.timeStartA))
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.menu.context.hide = true;
    this.menu.move.hide = true;
  }

  addFolderEmit() {
    /*const dialog: MyDialogNaming = {
      title: "Add Folder",
    }*/
    super.addFolder();
  }

  deleteFileEmit(): void {
    super.deleteFiles(this.selectedIds)
  }

  openFileEmit(fileId: string) {
    super.openFile(fileId);
  }

  openFolderEmit(folderId: string) {
    super.openFolder(folderId);
  }

  openMenuContext(event: MouseEvent, fileId:string) {
    event.preventDefault();
    this.selectedIds = [];
    this.selectedIds.push(fileId);
    this.menu.context.top =  event.pageY  + 'px'; 
    this.menu.context.left = event.pageX + 'px'; 
    this.menu.context.hide = false;
  }

  openMenuMove(event: MouseEvent, buttonMoveFiles: any) {
    // Cannot move a single file or move file if not folder present
    //if (files.length < 2  || !files[0].isFolder ) return;
    const rect = buttonMoveFiles.getBoundingClientRect();
    this.menu.move.top = rect.top - 10 + 'px'; 
    this.menu.move.left = rect.right - 1 + 'px'; 
    this.menu.move.hide = false;
  }

  moveFilesEmit(targetId: string) {
    if (this.selectedIds.length == 0) return;
    super.moveFiles([...this.selectedIds], targetId)
  }

  renameFileEmit() {
    if (this.selectedIds.length == 0) return;
    super.renameFile(this.selectedIds[0]);
  }
}

