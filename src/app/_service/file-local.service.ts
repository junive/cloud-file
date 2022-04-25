import { Injectable } from '@angular/core';
import { MyFile } from '../file/_model/my-file'
import { Observable } from 'rxjs'
import { MyFileService } from '../file/_model/my-file-service';
import { environment } from 'src/environments/environment';
import { MyFileList } from '../file/_helper/file-list.helper';

@Injectable()
export class FileLocalService implements MyFileService {

  constructor() {}

  addFiles(): void { }

  getRootFiles(fileList: MyFileList): Observable<MyFile[]> {
    return new Observable(obs => {
      
      fileList.clear(); 
      const folderA = fileList.createFolder({name: 'Folder _A', parentId: environment.ROOT_FOLDER_ID }); 
      const folderAB = fileList.createFolder({ name: 'Folder BB', parentId: folderA.id! });
      fileList.createFolder({ name: 'Folder ABC', parentId: folderAB.id! });
      fileList.createFile({ name: 'File ABC', parentId: folderAB.id! });
      fileList.createFolder({name: 'Folder E', parentId: environment.ROOT_FOLDER_ID });
      fileList.createFolder({name: 'Folder C', parentId: environment.ROOT_FOLDER_ID });
      fileList.createFile({ name: 'File A', parentId: environment.ROOT_FOLDER_ID }); 
      fileList.createFile({ name: 'File B', parentId: environment.ROOT_FOLDER_ID }); 

      for (let i =0; i<10000 ; i++) {
        fileList.createFolder({ name: 'Folder 0', parentId: environment.ROOT_FOLDER_ID });
      }
      
      fileList.sortbyNameASC();
      
      obs.next(fileList.getCurrentFiles());
    });
  }


  ngOnInit() {
   
    
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