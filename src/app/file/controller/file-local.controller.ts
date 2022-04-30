import { Injectable } from '@angular/core';
import { MyFile, MyFolder } from '../model/my-file'
import { BehaviorSubject, Observable } from 'rxjs'
import { MyFileController } from '../model/my-file-controller';
import { environment } from 'src/environments/environment';
import { MyFileList } from './file-local.list';
import { v4 } from 'uuid';

@Injectable()
export class FileLocalController implements MyFileController {
  fileList: MyFileList;

  root: MyFolder = <MyFolder> {
    id: "root", 
    name : "Local Home", 
    parentId: "rootParent",
    isFolder: true
  };

  constructor() { 
    this.fileList = new MyFileList();
    this.fileList.add(this.root);
    
      const folderA = this.fileList.createFolder({id:v4(), name: 'Folder _A', parentId: this.root.id }); 
      this.fileList.createFolder({id:v4(), name: 'aa', parentId: this.root.id }); 
      const folderAB = this.fileList.createFolder({id:v4(), name: 'Folder BB', parentId: folderA.id });
      this.fileList.createFolder({id:v4(), name: 'aa', parentId: folderA.id });
      this.fileList.createFolder({id:v4(), name: 'Folder ABC', parentId: folderAB.id });
      this.fileList.createFile({id:v4(), name: 'File ABC', parentId: folderAB.id });
      this.fileList.createFolder({ id:v4(), name: 'Folder E', parentId: this.root.id });
      this.fileList.createFolder({id:v4(), name: 'Folder C', parentId: this.root.id });
      this.fileList.createFile({id:v4(), name: 'File A', parentId: this.root.id }); 
      this.fileList.createFile({id:v4(), name: 'File B', parentId: this.root.id }); 

      for (let i =1; i<10000 ; i++) {
        this.fileList.createFolder({ id:v4(), name: 'Folder '+i, parentId: this.root.id });
      }

  }

  addFolder(name: string, parentId: string): Observable<void> {
    return this.observable(
      this.fileList.createFolder({
        id:v4(), name: name, parentId: parentId
      })
    );
    //this.fileList.sortbyNameASC(parentId);
  }

  deleteFiles(filesId: string[]): Observable<void> {
    return this.observable(this.fileList.deleteFiles(filesId))
  }

  getFile(fileId: string): Observable<MyFile> {
    return this.observable(this.fileList.getFile(fileId));
  }

  getFiles(folderId?: string): Observable<MyFile[]> {
    return new Observable<MyFile[]> (obs => {
      if (!folderId) folderId = this.root.id;
      this.fileList.sortbyNameASC(folderId);
      obs.next(this.fileList.getFiles(folderId!));
    });
  }

  getRootFolder(): MyFolder {
    return this.root;
  }

  moveFiles(filesId: string[], targetFolderId: string ): Observable<void>  {
    return this.observable(
      this.fileList.moveFiles(filesId, targetFolderId)
    );
  }

  updateFiles(files: MyFile[]): Observable<void> {
    return this.observable(() => {});
  }

  observable(request:any) {
    return new Observable<any> (observer => {
      observer.next(request);
    });
  }

  

  /*
  updateFilesObserver(filesId? : string[]) {
    // Have to create a new array in order to push it on view
    const result: MyFile[] = [...this.fileList.getCurrentFiles(filesId)]; 
    if (!this.filesSubject) {
      this.filesSubject = new BehaviorSubject( result );
    } else {
      this.filesSubject.next(result);
    }
    this.setFilesObserver(this.filesSubject)//.pipe(shareReplay())
  }
  */
}