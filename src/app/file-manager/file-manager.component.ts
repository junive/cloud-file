import { Component, Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DialogErrorEnum } from '../dialog/helper/dialog-enum';
import { MyFileList } from '../file-explorer/helper/my-file-list';
import { MyFile } from '../_model/my-file';
import { MyFolder } from '../_model/my-folder';
import { MySimpleDialog } from '../_model/my-simple-dialog';

@Component({
  selector: 'my-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})

export class FileManagerComponent implements OnInit {
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
    if (this.fileShow.navigation) {
      this.navFolders = [this.fileList.getRootFolder()];
    }

    const folderA = this.fileList.createFolder({name: 'Folder _A', parentId: environment.ROOT_FOLDER_ID }); 
    const folderAB = this.fileList.createFolder({ name: 'Folder B', parentId: folderA.id! });
    this.fileList.createFolder({ name: 'Folder ABC', parentId: folderAB.id! });
    this.fileList.createFile({ name: 'File ABC', parentId: folderAB.id! });
    this.fileList.createFolder({name: 'Folder E', parentId: environment.ROOT_FOLDER_ID });
    this.fileList.createFolder({name: 'Folder C', parentId: environment.ROOT_FOLDER_ID });
    this.fileList.createFile({ name: 'File A', parentId: environment.ROOT_FOLDER_ID }); 
    this.fileList.createFile({ name: 'File B', parentId: environment.ROOT_FOLDER_ID }); 

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
