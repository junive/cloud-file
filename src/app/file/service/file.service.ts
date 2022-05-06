import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { MyFile, MyFolder } from "../model/my-file";
import { MyFileService, MyFileCreateQuery, MyFileGetQuery, MyFileUpdateQuery } from "../model/my-file-service";

@Injectable()
export class FileService implements MyFileService {
  currentId: string = "";
  
  constructor() { }

  create$(q: MyFileCreateQuery): Observable<void> {
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

  getCurrentFiles$(q?: MyFileGetQuery): Observable<MyFile[]> {
    const query =  {...{ driveId: this.currentId }, ...q! }
    return this.getFiles$(query);
  }
  
  getFile$(q: MyFileGetQuery): Observable<MyFile> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  getFiles$(q: MyFileGetQuery): Observable<MyFile[]> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  getRootFolder(): MyFolder {
    throw new Error('FileService.ts : Method not implemented.');
  }

  moveFiles$(queries: MyFileUpdateQuery[], deletesId: string[]) {
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

  updateFile$(q: MyFileUpdateQuery): Observable<void> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  updateFiles$(queries: MyFileUpdateQuery[]): Observable<void[]> {
    const updates$: Observable<void>[] = [];
    queries.forEach(query => updates$.push(this.updateFile$(query)));
    return combineLatest(updates$);
  }

}