import { Component, Inject, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, map, Observable, share, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileExplorerComponent } from '../file-explorer/file-explorer.component';
import { DialogErrorEnum } from '../_helper/dialog-enum';
import { MyFileList } from '../_helper/my-file-list';
import { MyFile } from '../_model/my-file';
import { MyFileManagerService } from '../_model/my-file-manager';
import { MyFolder } from '../_model/my-folder';
import { MySimpleDialog } from '../_model/my-simple-dialog';

@Component({
  selector: 'my-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})


export class FileManagerComponent implements OnInit {
  title = 'file-Manager';
  @ViewChild(FileExplorerComponent) fileExplorer!: FileExplorerComponent;
  
  //private readonly onDestroy = new Subject<void>();
  
  fileList: MyFileList = new MyFileList();
  navFolders!: MyFolder[];
  selectedFiles: MyFile[] = [];
  private timeStartA:any

  @Input() service!:MyFileManagerService;
  @Input() initFiles: boolean = false;
  @Input() hide: any =  {
    navigation:false
  }
  
  
  constructor() {  }

  ngOnInit() {
    if (!this.service) {
      throw new Error('Service not injected in FileManagerComponent');
    }
    if (this.initFiles) {
      this.timeStartA = Date.now();
      this.fileList.setFilesObserver(
        this.service.getRootFiles(this.fileList)
      );
       /* this.service.init().pipe(takeUntil(this.onDestroy))
      .subscribe( files => {
      }*/
    }
    if (!this.hide.navigation) {
      this.navFolders = [this.fileList.getRootFolder()];
    }
   }


  ngAfterViewInit() {
    console.log((Date.now() - this.timeStartA))
    //setTimeout( () => {
   //}, 1000);
   }
  
  ngOnDestroy() {
    //this.onDestroy.next();
  }
  
  addFolder(dialog:MySimpleDialog ) {
    if (!dialog.name || dialog.name == "") return;
    if (this.fileList.hasSameFile(dialog.name)) {
      dialog.error = DialogErrorEnum.FOLDER_EXIST;
    } else {
      this.fileList.createFolderToCurrent(dialog.name); 
      this.fileList.sortbyNameASC();
    }
    this.fileList.updateFilesObserver();
  }

  deleteFiles() {

   // console.log( this.selectedFiles[0].id)
    for (let i=0; i < this.selectedFiles.length; i++) {
      this.fileList.deleteFile(this.selectedFiles[i].id!);
    }
    this.fileList.updateFilesObserver();
  }

  openFile(fileId: string) {
    const file: MyFile = this.fileList.getCurrentFile(fileId);
    if (!file) return;
    this.fileList.updateFilesObserver();
  }

  openFolder(folderId: string) {
    if ( this.navFolders.length > 0) {
      let newNav : MyFolder[] = [];
      for (let nav of this.navFolders) {
        newNav.push(nav);
        if (folderId == nav.id) break;
      }
      const folder = this.fileList.getCurrentFile(folderId);
      if (folder) newNav.push(folder);
      this.navFolders = newNav;
    }
    this.fileList.setCurrentId(folderId);
    this.fileList.sortbyNameASC();
    this.fileList.updateFilesObserver();
  }

  selectFiles(filesId: string[]) {  
    this.selectedFiles = this.fileList.getCurrentFiles(filesId)
  }

  moveFile(folderTargetId: string) {
    this.fileList.moveFiles(folderTargetId, this.selectedFiles);
    this.fileList.updateFilesObserver();
  }

  renameFile(dialog: MySimpleDialog) {
    if (!dialog.name || dialog.name == "") return;
    // Correct a bug on slow angular reaction to change of name
    //const dummyFile: MyFile =  Object.assign({}, dialog.file!); 
    //dummyFile.name = dialog.name;
    
    //this.fileList.moveFiles(this.fileList.getCurrentId(), [dummyFile]);
    dialog.file!.name = dialog.name;
   // this.fileList.getCurrentFile(dialog.file!.id!).name = dialog.name;
    //console.log(dialog.file!.name, dialog.file!.id)
    this.fileList.sortbyNameASC();
    this.fileList.updateFilesObserver();
  }

  
}
