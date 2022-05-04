import { Injectable } from '@angular/core';

import { MyFile, MyFolder } from '../model/my-file'
import { Observable } from 'rxjs'
import { MyFileController, MyFileQuery } from '../model/my-file-controller';
import { MyFileList } from './file-local.list';
import { v4 } from 'uuid';


@Injectable()
export class FileGooglePhotosController implements MyFileController{
  fileList: MyFileList;
  root: MyFolder = {id: "root",  name : "Home", parentId: "rootParent", isFolder:true};
  currentId: string = this.root.id;

  constructor() { 
    this.fileList = new MyFileList();
    this.root = this.fileList.createFolder(this.root);
    
      //fileList.clear();
    this.fileList.createFolder({id:v4(), name: 'Folder _AA', parentId: this.root.id }); 
    this.fileList.createFolder({id:v4(), name: 'Folder BB', parentId: this.root.id });
    this.fileList.createFile({id:v4(), name: 'File ABC', parentId: this.root.id });
  }

  getRootFolder(): MyFolder {
    return this.root;
  }

  getFile$(q: MyFileQuery): Observable<MyFile>  {
    const get = (): MyFile | undefined => {
      if (q.fileId) return this.fileList.getFile(q.fileId)
      return undefined;
    }
    return this.observable(get());
  }

  getFiles$(q: MyFileQuery): Observable<MyFile[]> {
    const get = (): MyFile[]  => {
      let files: MyFile[] = [];
      if (q.driveId && q.names) {
        files = this.fileList.getFilesByNames(q.driveId, q.names)
      } else if (q.driveId) {
        //if (!q.driveId) q.driveId = this.root.id;
        files = this.fileList.getFiles(q.driveId!)
      } else if (q.filesId) {
        files = this.fileList.getFilesByIds(q.filesId)
      }
      if (q.orderBy == "asc") {
        this.fileList.sortByNameASC(files);
      }
      return files;
    }
    return this.observable(get());

  }

  addFolder$(name: string, parentId: string): Observable<void>  {
    return new Observable<void> (obs => {
      this.fileList.createFolder({id:v4(), name: name, parentId: parentId} );
    });
  }

  deleteFile$(fileId: string): Observable<void> {
    throw new Error('Method not implemented.');
  }

  moveFiles$(filesId: string[], targetFolderId: string): Observable<void>  {
    throw new Error('Method not implemented.');
  }

  updateFile$(q:MyFileQuery): Observable<void> {
    throw new Error('Method not implemented.');
  }

  observable(request:any) {
    return new Observable<any> (observer => {
      observer.next(request);
      observer.complete();
    });
  }
  

}