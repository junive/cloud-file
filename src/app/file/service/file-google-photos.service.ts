import { Injectable } from '@angular/core';
import { MyFile, MyFolder } from '../model/my-file'
import { Observable } from 'rxjs'
import { MyFileService, MyFileCreateQuery, MyFileGetQuery, MyFileUpdateQuery } from '../model/my-file-service';
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
export class FileGooglePhotosService extends FileService implements MyFileService{
  fileList: MyFileList;
  root: MyFolder = {id: "root",  name : "Home", parentId: "rootParent", isFolder:true};
  
  constructor() { 
    super();
    this.fileList = new MyFileList();
    this.root = this.fileList.createFolder(this.root);
    
      //fileList.clear();
    this.fileList.createFolder({id:v4(), name: 'Folder _AA', parentId: this.root.id }); 
    this.fileList.createFolder({id:v4(), name: 'Folder BB', parentId: this.root.id });
    this.fileList.createFile({id:v4(), name: 'File ABC', parentId: this.root.id });
  }

  override getRootFolder(): MyFolder {
    return this.root;
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

  override create$(q: MyFileCreateQuery): Observable<void> {
    return this.observable(
      this.fileList.createFolder({
        id:v4(), name: q.name!, parentId: q.driveId!
      })
    );
  }

  override deleteFile$(fileId: string): Observable<void> {
    throw new Error('Method not implemented.');
  }

  override updateFile$(q: MyFileUpdateQuery): Observable<void> {
    throw new Error('Method not implemented.');
  }

}