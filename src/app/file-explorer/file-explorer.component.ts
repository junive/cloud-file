import { Component, Input, Output, EventEmitter, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core'
import { MatMenuTrigger } from '@angular/material/menu';
import { MyFile } from '../_model/my-file';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from './modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './modals/rename-dialog/rename-dialog.component';
import { MyFileList } from './helper/my-file-list';
import { MyFolder } from '../_model/my-folder';
import { environment } from '../../environments/environment';

@Component({
  selector: "file-explorer",
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css'],
})

export class FileExplorerComponent {

  navGoTo: MyFolder[] = [<MyFolder> environment.API_ROOT_FOLDER];

  @ViewChild('fileContainer', { read: ViewContainerRef }) fileContainer!: ViewContainerRef;
 // @ViewChild('fileTemplate', { read: TemplateRef }) fileTemplate!: TemplateRef<any>;
  
  @Input() fileList: MyFileList = new MyFileList();

  @Output() addFolderEvent = new EventEmitter<MyFolder>()
  @Output() goToFolderEvent = new EventEmitter<MyFile>()
  @Output() moveFileEvent = new EventEmitter<{
    file: MyFile, moveTo: MyFile }>()
  @Output() removeFileEvent = new EventEmitter<MyFile>()
  @Output() renameFileEvent = new EventEmitter<{
   file: MyFile, newName: string }>()

  constructor(public dialog: MatDialog) { 
    //this.fileList.setCurrentPathId(this.currentPathId);
  }

  ngAfterViewChecked() { }
  
  //getFileContainer(): ViewContainerRef {
    //return this.fileContainer;
  //}

  //getFileTemplate(): TemplateRef<any> {
    //return this.fileTemplate;
  //}

  deleteFileEmit(file: MyFile) {
    this.removeFileEvent.emit(file);
  }

  moveFile(file: MyFile, moveTo: MyFile) {
    this.moveFileEvent.emit({ file: file, moveTo: moveTo });
  }

  goToFolderEmit(folder: MyFolder): boolean {
    if (!folder.isFolder) return false; // Todo : removeDblClick on file
    let newNav : MyFolder[] = [];
    for (let nav of this.navGoTo) {
      if (folder.id == nav.id) break;
      newNav.push(nav);
    };
    newNav.push(folder);
    this.navGoTo = newNav;
    this.goToFolderEvent.emit(folder);
    return true;
  }
 
  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (folderName: string) => {
        if (!folderName) return;
        this.addFolderEvent.emit(<MyFolder> { 
            name: folderName, 
            parentId: this.fileList.getCurrentPathId()
          }
        );
    }});
  }
  
  openRenameDialog(file: MyFile) {
    let dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(fileName => {
      if (!fileName) return;
      this.renameFileEvent.emit({file:file, newName : fileName});
    });
  }

  openMenu(event: MouseEvent,  element: MyFile, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }

}
