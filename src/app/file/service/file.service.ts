import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { MyFile, MyFolder } from "../model/my-file";
import { MyFileService, MyFileQuery } from "../model/my-file-service";

@Injectable()
export class FileService implements MyFileService {
  currentId: string = "";
  
  constructor() { }

  create$(q: MyFileQuery): Observable<void> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  deleteFile$(fileId: string): Observable<void> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  deleteFiles$(filesId: string[]): Observable<void[]> {
    const deletes$: Observable<void>[] = [];
    filesId.forEach(id => deletes$.push(this.deleteFile$(id)));
    return combineLatest(deletes$);
  }

  getCurrentFiles$(q?: MyFileQuery): Observable<MyFile[]> {
    const query =  {...{ driveId: this.currentId }, ...q! }
    return this.getFiles$(query);
  }
  
  getFile$(q: MyFileQuery): Observable<MyFile> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  getFiles$(q: MyFileQuery): Observable<MyFile[]> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  getRootFolder(): MyFolder {
    throw new Error('FileService.ts : Method not implemented.');
  }

  moveFiles$(queries: MyFileQuery[], deletesId: string[]) {
    return combineLatest([
      this.updateFiles$(queries),
      this.deleteFiles$(deletesId) 
    ])
  }

  observable(request:any): Observable<any> {
    return new Observable<any> (observer => {
      observer.next(request);
      observer.complete();
    });
  }

  updateFile$(q: MyFileQuery): Observable<void> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  updateFiles$(queries: MyFileQuery[]): Observable<void[]> {
    const updates$: Observable<void>[] = [];
    queries.forEach(query => updates$.push(this.updateFile$(query)));
    return combineLatest(updates$);
  }

}