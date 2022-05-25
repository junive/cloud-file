import { Component, HostListener, Input, Optional } from '@angular/core'
import { ElementPositionPipe } from '../../../shared/pipes/element-position';
import { MyFile } from '../../models/my-file';
import { MyFileSelect } from '../../models/my-file';
import { FileService } from '../../services/file-controller.service';

@Component({
  selector: "my-context-menu",
  templateUrl: "./context-menu.html",
  styleUrls: ['../../../../assets/scss/files/context-menu.css']

})
export class ContextMenuComponent  {
  files: MyFile[] = [];
  selectids: string[] = [];
  
  menu: any = {
    context: { hide: true, top: 0, left: 0, w:0, style: ""  },
    move: { hide: true, top: -10, left: -1, w:1, style: "" }
  }

  constructor(public service: FileService,
              public positionPipe: ElementPositionPipe) { }

  ngOnInit() {
    this.service.select$.subscribe((select: MyFileSelect) => {
        if (!select.menu || select.ids.length < 1) return;
        // get last emitted value on behavior subject
        this.files = [ ...this.service.files$.getValue() ]
        this.selectids = [ ...select.ids ];
        this.openMenu(select.menu.mouse$, this.menu.context);
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.menu.context.hide = true;
    this.menu.move.hide = true;
  }

  addFolderEmit() {
    this.service.addFolder(this.selectids[0]);
  }

  deleteFileEmit(): void {
    this.service.deleteFiles(this.selectids);
  }

  enableMoveFiles() {
    //Cannot move a lonely file or if no folder is present
    return this.files && this.files.length > 1 && this.files[0].isFolder
  }

  openMenu(elem: any, menu: any) {
    menu.style = this.positionPipe.transform(elem, {
      w: menu.w, left: menu.left, top: menu.top, 
    });
    menu.hide = false;
  }

  moveFilesEmit(targetId: string) {
    this.service.moveFiles(this.selectids, targetId);
  }

  renameFileEmit() {
    this.service.renameFile(this.selectids[0]);
  }

}


