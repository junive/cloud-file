import { Component, HostListener, Input, Optional } from '@angular/core'
import { MyFile } from 'src/app/shared/models/file/my-file';
import { MyFileSelect } from 'src/app/shared/models/file/my-file-select';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: "my-context-menu",
  templateUrl: "./context-menu.html",
 // styleUrls: ['../../../../../assets/scss/file.css']

})
export class ContextMenuComponent  {
  files: MyFile[] = [];
  selectids: string[] = [];
  menu: any = {
    context: { hide: true, top: 0, left: 0  },
    move: { hide: true, top: 0, left: 0 }
  }

  constructor(public service: FileService) { }

  ngOnInit() {
   /* this.service.files$.subscribe(files => {
      console.log("fil")
      this.files = [...files];
      //this.cdRef.detectChanges();
    })*/
     

    this.service.select$.subscribe((select: MyFileSelect) => {
        if (!select.menu || select.ids.length < 1) return;
        // get last emitted value on behavior subject
        this.files = [ ...this.service.files$.getValue() ]
        this.selectids = [ ...select.ids ];
        this.openMenuContext(select.menu.event)
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

  openMenuMove(buttonMoveFiles: any) {
    // Cannot move a single file or move file if not folder present
    //if (files.length < 2  || !files[0].isFolder ) return;
    const rect = buttonMoveFiles.getBoundingClientRect();
    this.menu.move.top = rect.top - 10 + 'px'; 
    this.menu.move.left = rect.right - 1 + 'px'; 
    this.menu.move.hide = false;
  }

  openMenuContext(event: MouseEvent) {
    this.menu.context.top =  event.pageY + 'px'; 
    this.menu.context.left = event.pageX + 'px'; 
    this.menu.context.hide = false;
  }

  moveFilesEmit(targetId: string) {
    this.service.moveFiles(this.selectids, targetId);
  }

  renameFileEmit() {
    this.service.renameFile(this.selectids[0]);
  }

}


