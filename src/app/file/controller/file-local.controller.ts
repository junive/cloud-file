import { Injectable } from '@angular/core';
import { MyFile, MyFolder } from '../model/my-file'
import { Observable } from 'rxjs'
import { MyFileController, MyFileQuery } from '../model/my-file-controller';
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

  currentId: string = this.root.id;

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
  
  
  getCurrentFiles$(): Observable<MyFile[]> {
    throw new Error('Method not implemented.');
  }

  addFolder$(name: string, parentId: string): Observable<void> {
    return this.observable(
      this.fileList.createFolder({
        id:v4(), name: name, parentId: parentId
      })
    );
    //this.fileList.sortbyNameASC(parentId);
  }

  deleteFile$(fileId: string): Observable<void> {
    return this.observable(this.fileList.deleteFile(fileId))
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

/*getFilesByIds$(fileIds: string[]) {
    return this.observable(this.fileList.getFilesByIds(fileIds));
  }

  getFilesByNames$(folderId: string, names: string[]) {
    return this.observable( this.fileList.getFilesByNames(folderId, names));
  }*/

  getRootFolder(): MyFolder {
    return this.root;
  }

  /*
  moveFiles$(filesId: string[], targetFolderId: string ): Observable<void>  {
    return this.observable(
      this.fileList.moveFiles(filesId, targetFolderId)
    );
  }
  */

  updateFile$(q:MyFileQuery): Observable<void> {
    const update = () => {
      const file = this.fileList.getFile(q.fileId!);
      const clone: MyFile = Object.assign({}, file);
      if (q.name) clone.name = q.name;
      if (q.targetId) clone.parentId = q.targetId;
      this.fileList.deleteFile(q.fileId!);
      this.fileList.add(clone);
    }
    return this.observable(update());
  }

  observable(request:any) {
    return new Observable<any> (observer => {
      observer.next(request);
      observer.complete();
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