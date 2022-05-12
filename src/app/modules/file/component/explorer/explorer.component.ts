import { Component, Input, HostListener, Injector } from '@angular/core'
import { MySvgAsset } from '../../../../../assets/svg';
import { MyFileConfig } from '../../../../shared/models/file/my-file-config';
import { ExplorerFileAbstract } from './explorer.abstract';
import { FileService } from '../../../../core/http/file.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "my-explorer-file",
  templateUrl: "./explorer.html",
  styleUrls: ['../../../../../assets/scss/file.css']
  //changeDetection: ChangeDetectionStrategy.OnPush,
  //providers: [  ],
})

export class ExplorerFileComponent extends ExplorerFileAbstract {
  selectedIds: string[] = [];
  mysvg = MySvgAsset;

  menu: any = {
    context: { hide: true, top: 0, left: 0  },
    move: { hide: true, top: 0, left: 0 }
  }

  constructor() { 
    super()
  }

  override ngOnInit() {
    super.ngOnInit()
  }
 

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.menu.context.hide = true;
    this.menu.move.hide = true;
  }

  addFolderEmit() {
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

