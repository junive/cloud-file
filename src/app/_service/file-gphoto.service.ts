import { Injectable } from '@angular/core';

import { MyFile } from '../_model/my-file'
import { BehaviorSubject } from 'rxjs'
import { Observable } from 'rxjs'
import { MyFileManagerService } from '../_model/my-file-manager';
import { MyFileList } from '../_helper/my-file-list';
import { environment } from 'src/environments/environment';




@Injectable()
export class FileGPhotoService implements MyFileManagerService{
  constructor() {}
  getRootFiles(fileList: MyFileList): Observable<MyFile[]> {
    return new Observable(obs => {
      //fileList.clear();
      fileList.createFolder({name: 'Folder _A', parentId: environment.ROOT_FOLDER_ID }); 
      fileList.createFolder({ name: 'Folder BB', parentId: environment.ROOT_FOLDER_ID });
      fileList.createFile({ name: 'File ABC', parentId: environment.ROOT_FOLDER_ID });


      obs.next(fileList.getCurrentFiles());
    });
  }
  
  addFiles(): void {
    throw new Error('Method not implemented.');
  }

  add(fileElement: MyFile) {

  }

  delete(id: string) {

  }

  update(id: string, update: Partial<MyFile>) {

  }

  openFolder(folderId: string) {

  }

  get(id: string) {
  }

}