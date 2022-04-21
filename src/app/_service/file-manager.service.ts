import { Injectable } from '@angular/core';
import { MyFile } from '../_model/my-file'



@Injectable()
export class FileManagerService {


  constructor() {}

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