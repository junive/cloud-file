import { Injectable } from '@angular/core';
import { MyFile, MyFolder } from '../model/my-file'
import { Observable } from 'rxjs'
import { MyFileService, MyFileQuery } from '../model/my-file-service';
import { MyFileList } from './file-local.list';
import { v4 } from 'uuid';
import { FileService } from './file.service';

@Injectable()
export class FileLocalService extends FileService implements MyFileService {
  fileList: MyFileList;

  root: MyFolder = <MyFolder> {
    id: "root", 
    name : "Local Home", 
    parentId: "rootParent",
    isFolder: true
  };

  constructor() { 
    super();
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
  
  
  override create$(q: MyFileQuery): Observable<void> {
    return this.observable(
      this.fileList.createFolder({
        id:v4(), name: q.name!, parentId: q.parentId!
      })
    );
    //this.fileList.sortbyNameASC(parentId);
  }

  override deleteFile$(fileId: string): Observable<void> {
    return this.observable(this.fileList.deleteFile(fileId, true))
  }

  override getFile$(q: MyFileQuery): Observable<MyFile>  {
    const get = (): MyFile | undefined => {
      if (q.fileId) return this.fileList.getFile(q.fileId)
      return undefined;
    }
    return this.observable(get());
  }

  override getFiles$(q: MyFileQuery): Observable<MyFile[]> {
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

  override getRootFolder(): MyFolder {
    return this.root;
  }

  /*
  moveFiles$(filesId: string[], targetFolderId: string ): Observable<void>  {
    return this.observable(
      this.fileList.moveFiles(filesId, targetFolderId)
    );
  }
  */

  override updateFile$(q:MyFileQuery): Observable<void> {
    const update = () => {
      const file = this.fileList.getFile(q.fileId!);
      if (q.name) file.name = q.name;
      if (q.targetId) this.fileList.moveFile(q.fileId!, q.targetId)
    }
    return this.observable(update());
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