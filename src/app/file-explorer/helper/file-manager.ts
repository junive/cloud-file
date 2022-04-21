import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { MyFile } from '../../_model/my-file';
import { MyFileList } from './my-file-list';
import { MyFolder } from '../../_model/my-folder';
import { FileExplorerComponent } from '../file-explorer.component';
import { MySimpleDialog } from 'src/app/_model/my-simple-dialog';
import { DialogErrorEnum } from 'src/app/dialog/helper/dialog-enum';

@Injectable()
export class FileManager {
  title = 'file-Manager';
  fileList: MyFileList = new MyFileList();
  navFolders!: MyFolder[];
  selectedFiles: MyFile[] = [];
  fileShow: any = {
    navigation: true
  }
  
  constructor( ) {  }

  ngOnInit() {
      // File-explorer check if navFolder is defined
    if (this.fileShow.navigation) 
      this.navFolders = [this.fileList.getRootFolder()];
   }


  addFolder(dialog:MySimpleDialog ) {
    if (!dialog.name || dialog.name == "") return;
    if (this.fileList.hasSameFile(dialog.name)) {
      dialog.error = DialogErrorEnum.FOLDER_EXIST;
    } else {
      this.fileList.createFolderToCurrent(dialog.name); 
      this.fileList.sortbyNameASC();
    }
  }

  deleteFiles() {
    for (let i=0; i < this.selectedFiles.length; i++) {
      this.fileList.deleteFile(this.selectedFiles[i].id!);
    }
  }

  openFile(fileId: string) {
    const file: MyFile = this.fileList.getCurrentFile(fileId);
    if (!file) return;
  }

  openFolder(folderId: string) {
    if (this.fileShow.navigation) {
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
  }

  selectFiles(filesId: string[]) {
    this.selectedFiles = this.fileList.getCurrentFiles(filesId)
  }

  moveFile(folderTargetId: string) {
    this.fileList.moveFiles(folderTargetId, this.selectedFiles);
  }

  renameFile(dialog: MySimpleDialog) {
    if (!dialog.name || dialog.name == "") return;
    // Correct a bug on slow angular reaction to change of name
    const dummyFile: MyFile =  Object.assign({}, dialog.file!); 
    dummyFile.name = dialog.name;
    
    this.fileList.moveFiles(this.fileList.getCurrentId(), [dummyFile]);
    //dialog.file!.name = dialog.name;
    //setTimeout(()=> { 
    this.fileList.sortbyNameASC();
   //}, 0);
  }


}
