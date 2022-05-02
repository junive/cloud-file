import { Injectable } from '@angular/core';

import { MyFile, MyFolder } from '../model/my-file'
import { Observable } from 'rxjs'
import { MyFileController } from '../model/my-file-controller';
import { MyFileList } from './file-local.list';
import { v4 } from 'uuid';





@Injectable()
export class FileGooglePhotosController implements MyFileController{
  fileList: MyFileList;
  
  root: MyFolder = {id: "root",  name : "Home", parentId: "rootParent", isFolder:true};

  constructor() { 
    this.fileList = new MyFileList();
    this.root = this.fileList.createFolder(this.root);
    
      //fileList.clear();
      this.fileList.createFolder({id:v4(), name: 'Folder _AA', parentId: this.root.id }); 
      this.fileList.createFolder({id:v4(), name: 'Folder BB', parentId: this.root.id });
      this.fileList.createFile({id:v4(), name: 'File ABC', parentId: this.root.id });
  }

  getRootFolder(): MyFolder {
   /* return new Observable<MyFolder> (obs => {
      obs.next(this.rootFolder);
    });*/
    return this.root;
  }

  getFile$(fileId: string): Observable<MyFile> {
    throw new Error('Method not implemented.');
  }

  getFiles$(folderId?: string) {
    const id = folderId ? folderId : this.root.id;
    this.fileList.sortbyNameASC(id);
    return new Observable<MyFile[]> (obs => {
      obs.next([...this.fileList.getFiles(id)])
    });
    
  }

  addFolder$(name: string, parentId: string): Observable<void>  {
    return new Observable<void> (obs => {
      this.fileList.createFolder({id:v4(), name: name, parentId: parentId} );
    });
  }

  deleteFiles$(filesId: string[]): Observable<void> {
    throw new Error('Method not implemented.');
  }

  moveFiles$(filesId: string[], targetFolderId: string): Observable<void>  {
    throw new Error('Method not implemented.');
  }

  updateFiles$(files: MyFile[]): Observable<void>  {
    throw new Error('Method not implemented.');
  }

  

}