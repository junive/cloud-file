import { Injectable } from '@angular/core';
import { MyFile, MyFolder } from '../model/my-file'
import { Observable } from 'rxjs'
import { MyFileService, MyFileCreateQuery, MyFileUpdateQuery, MyFileGetQuery } from '../model/my-file-service';
import { MyFileList } from './file-local.list';
import { FileService } from './file.service';

function v4() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

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
      console.log(v4())
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
  
  
  override create$(q: MyFileCreateQuery): Observable<void> {
    return this.observable(
      this.fileList.createFolder({
        id:v4(), name: q.name!, parentId: q.driveId!
      })
    );
    //this.fileList.sortbyNameASC(parentId);
  }

  override deleteFile$(fileId: string): Observable<void> {
    return this.observable(this.fileList.deleteFile(fileId, true))
  }

  override getFile$(q: MyFileGetQuery): Observable<MyFile>  {
    const get = (): MyFile | undefined => {
      if (q.fileId) return this.fileList.getFile(q.fileId)
      return undefined;
    }
    return this.observable(get());
  }

  override getFiles$(q: MyFileGetQuery): Observable<MyFile[]> {
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

  override updateFile$(q: MyFileUpdateQuery): Observable<void> {
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