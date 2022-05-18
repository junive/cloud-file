import { Injectable } from '@angular/core';
import { MyFile, MyFolder } from '../../../shared/models/file/my-file'
import { Observable } from 'rxjs'
import { FileList } from './file-list.helper';
import { MyFileCreateQuery, MyFileGetListQuery, MyFileUpdateQuery } from '../../../shared/models/file/my-file-query';
import { FileController } from '../../abstract/file.controller';
import { MyFileController } from 'src/app/shared/models/file/my-file-controller';



@Injectable()
export class GooglePhotosController extends FileController implements MyFileController{
  fileList: FileList;
  root: MyFolder = {id: "root",  name : "Home", parentId: "rootParent", isFolder:true};
  
  constructor() { 
    super();
    this.fileList = new FileList();
    this.root = this.fileList.createFolder(this.root);
    this.fileList.createFolder({id:  FileList.v4(), name: 'Folder _AA', parentId: this.root.id }); 
    this.fileList.createFolder({id: FileList.v4(), name: 'Folder BB', parentId: this.root.id });
    this.fileList.createFile({id: FileList.v4(), name: 'File ABC', parentId: this.root.id });
  }

  override getRootFolder(): MyFolder {
    return this.root;
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

  override create$(q: MyFileCreateQuery): Observable<void> {
    return this.observable(
      this.fileList.createFolder({
        id: FileList.v4(), name: q.name!, parentId: q.driveId!
      })
    );
  }

  override delete$(fileId: string): Observable<void> {
    throw new Error('Method not implemented.');
  }

  override update$(q: MyFileUpdateQuery): Observable<void> {
    throw new Error('Method not implemented.');
  }

}