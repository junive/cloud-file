import { Component, HostListener, Input, Optional } from '@angular/core'
import { ElementPositionPipe } from 'src/app/shared/pipes/element-position';
import { MyFile } from '../../../models/file/my-file';
import { MyFileSelect } from '../../../models/file/my-file';
import { FileService } from '../../../services/file.service';

@Component({
  selector: "my-context-menu",
  templateUrl: "./context-menu.html",
 // styleUrls: ['../../../../../assets/scss/file.css']

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

  openMenu(elem: any, menu: any) {
    menu.style = this.positionPipe.transform(elem, {
      w: menu.w, left: menu.left, top: menu.top, 
    });
    menu.hide = false;
  }

  openMenuMove(button: HTMLElement) {
    // Cannot move a single file or move file if not folder present
    //if (files.length < 2  || !files[0].isFolder ) return;
  }


  moveFilesEmit(targetId: string) {
    this.service.moveFiles(this.selectids, targetId);
  }

  renameFileEmit() {
    this.service.renameFile(this.selectids[0]);
  }

}


