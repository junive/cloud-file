import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { MyFile } from '../../_model/my-file';
import { MyFileList } from './my-file-list';
import { MyFolder } from '../../_model/my-folder';
import { FileExplorerComponent } from '../file-explorer.component';

@Injectable()
export class FileManager {
  title = 'file-Manager';
  fileList: MyFileList = new MyFileList();
  navFolders!: MyFolder[];
  
  constructor( ) {  }

  ngOnInit() { }

  // File-explorer check if navFolder is defined
  showNavigateFolder() {
    this.navFolders = [this.fileList.getRootFolder()];
  }


  addFolder(folderName: string ) {
    if (this.fileList.hasSameFile(folderName)) {
      alert("Folder '"+folderName +"' already Exist");
    } else {
      this.fileList.addFolderToCurrent(folderName); 
      this.fileList.sortbyNameASC();
    }
  }

  deleteFile(files: MyFile[]) {
    files.forEach(file => {
      this.fileList.deleteFiles([file]);
    });
  }


  openFileById(fileId: string) {
    const file: MyFile = this.fileList.getFileInCurrentById(fileId);
    
    if (file && file.isFolder) this.openFolder(<MyFolder>file);
  }

  openFolder(folder: MyFolder) {
    if (this.navFolders) {
      let newNav : MyFolder[] = [];
      for (let nav of this.navFolders) {
        if (folder.id == nav.id) break;
        newNav.push(nav);
      };
      newNav.push(folder);
      this.navFolders = newNav;
    }
    this.fileList.setCurrentFolder(folder);
  }

  moveFile(event: { file: MyFile; moveTo: MyFile }) {
    // this.fileService.update(event.element.id!, { parent: event.moveTo.id });
    // this.updateFileElementQuery();
  }

  renameFile(event : {file: MyFile, newName : string} ) {
    event.file.name = event.newName;
    this.fileList.sortbyNameASC();
  }

}
