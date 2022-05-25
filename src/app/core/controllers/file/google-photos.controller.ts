import { Injectable } from '@angular/core';
import { MyFile, MyFolder } from '../../../shared-files/models/my-file'
import { Observable } from 'rxjs'
import { FileRamStorage } from '../../storage/file-ram.storage';
import { MyFileCreateQuery, MyFileGetListQuery, MyFileUpdateQuery } from '../../../shared-files/models/my-file-query';
import { FileController } from '../abstract/file.controller';
import { MyFileController } from '../../../shared-files/models/my-file-controller';


@Injectable()
export class GooglePhotosController extends FileController implements MyFileController{
  root: MyFolder = <MyFolder> {
    id: "root", 
    name : "Local Home", 
    parentId: "rootParent",
    isFolder: true
  };
  
  constructor(private fileList: FileRamStorage) { 
    super();
    this.root = this.fileList.createFolder(this.root);
    this.fileList.createFolder({name: 'Folder _AA', parentId: this.root.id }); 
    this.fileList.createFolder({ name: 'Folder BB', parentId: this.root.id });
    this.fileList.createFile({name: 'File ABC', parentId: this.root.id });
  }

  override create$(q: MyFileCreateQuery): Observable<void> {
    return this.observable(
      this.fileList.createFolder({
        name: q.name!, parentId: q.driveId!
      })
    );
  }

  override delete$(id: string): Observable<void> {
    return this.observable(this.fileList.deleteFile(id, true))
  }

  override get$(id: string): Observable<MyFile>  {
    return this.observable(this.fileList.getFile(id));
  }

  override getList$(q: MyFileGetListQuery): Observable<MyFile[]> {
    const get = (): MyFile[]  => {
      let files: MyFile[] = [];
      if (q.driveId)  files = this.fileList.getFiles(q.driveId!)
      if (q.ids) files = this.fileList.getFilesByIds(q.ids)
      if (q.orderBy == "asc") this.fileList.sortByNameASC(files);
      return files;
    }
    return this.observable(get());
  }

  override getRootFolder(): MyFolder {
    return this.root;
  }

  override update$(q: MyFileUpdateQuery): Observable<void> {
    const update = () => {
      const file = this.fileList.getFile(q.id!);
      if (q.name) file.name = q.name;
      if (q.targetId) this.fileList.moveFile(q.id!, q.targetId)
    }
    return this.observable(update());
  }
}