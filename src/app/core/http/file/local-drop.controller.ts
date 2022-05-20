import { Injectable } from '@angular/core';
import { MyFile, MyFolder } from '../../../shared/models/file/my-file'
import { Observable } from 'rxjs'
import { FileList } from './file-list.helper';
import { MyFileCreateQuery, MyFileGetListQuery, MyFileUpdateQuery } from '../../../shared/models/file/my-file-query';
import { FileController } from '../../abstract/file.controller';
import { MyFileController } from 'src/app/shared/models/file/my-file-controller';



@Injectable()
export class LocalDropController extends FileController implements MyFileController{
  fileList: FileList;


  root: MyFolder = <MyFolder> {
    id: "root", 
    name : "Local Home", 
    parentId: "rootParent",
    isFolder: true
  };

  constructor() { 
    super();
    this.fileList = new FileList();
    this.fileList.add(this.root);
    const folderA = this.fileList.createFolder({ name: 'Folder _A', parentId: this.root.id }); 
    this.fileList.createFolder({ name: 'aa', parentId: this.root.id }); 
    const folderAB = this.fileList.createFolder({name: 'Folder BB', parentId: folderA.id });
    this.fileList.createFolder({ name: 'aa', parentId: folderA.id });
    this.fileList.createFolder({ name: 'Folder ABC', parentId: folderAB.id });
    this.fileList.createFile({name: 'File ABC', parentId: folderAB.id });
    this.fileList.createFolder({name: 'Folder E', parentId: this.root.id });
    this.fileList.createFolder({ name: 'Folder C', parentId: this.root.id });
    this.fileList.createFile({ name: 'File A', parentId: this.root.id }); 
    this.fileList.createFile({ name: 'File B', parentId: this.root.id }); 

    for (let i =1; i<10000 ; i++) {
      this.fileList.createFolder({  name: 'Folder '+i, parentId: this.root.id });
    }

  }
  
  override create$(q: MyFileCreateQuery): Observable<void> {
    return this.observable(
      this.fileList.createFolder({
        name: q.name!, parentId: q.driveId!
      })
    );
    //this.fileList.sortbyNameASC(parentId);
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