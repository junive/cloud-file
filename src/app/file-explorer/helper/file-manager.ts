import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MyFile } from '../../_model/my-file';
import { MyFileList } from './my-file-list';
import { MyFolder } from '../../_model/my-folder';
import { FileExplorerComponent } from '../file-explorer.component';

@Injectable()
export class FileManager implements OnInit {
  title = 'file-Manager';
  fileList: MyFileList = new MyFileList();
  @ViewChild('fileExplorer') fileExplorer!: FileExplorerComponent;
  
  constructor() {  }

  ngOnInit() { }

  addFolder(folder: MyFolder ) {
    if (this.fileList.hasSameFile(folder.name)) {
      alert("Folder '"+folder.name +"' already Exist");
    } else this.fileList.addFolder(folder); 
    this.fileList.sortbyNameASC();
  }
  
  moveFile(event: { file: MyFile; moveTo: MyFile }) {
   // this.fileService.update(event.element.id!, { parent: event.moveTo.id });
   // this.updateFileElementQuery();
  }

  navigateUp() {

  }
  
  goToFolder(folder: MyFolder) { 
    this.fileList.setCurrentFolder(folder);
  }

  pushToPath(path: string, folderName: string) {

  }
  
  popFromPath(path: string) {

  }

  renameFile(event : {file: MyFile, newName : string} ) {
    event.file.name = event.newName;
  }
   
  removeFile(file: MyFile) {
    this.fileList.deleteFiles([file]);
  }

}
