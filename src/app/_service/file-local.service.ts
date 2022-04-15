import { Injectable } from '@angular/core';
import { MyFile } from '../_model/my-file'
import { BehaviorSubject } from 'rxjs'
import { Observable } from 'rxjs'



@Injectable()
export class FileLocalService {


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