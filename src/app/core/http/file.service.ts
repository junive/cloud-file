import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { MyFile, MyFolder } from "../../shared/models/file/my-file";
import { MyFileCreateQuery, MyFileGetListQuery, MyFileUpdateQuery } from "../../shared/models/file/my-file-query";
import { MyDataService} from "../../shared/models/http/my-data";

@Injectable()
export class FileService implements MyDataService {
  currentId: string = "";
  
  constructor() { }

  create$(q: MyFileCreateQuery): Observable<void> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  delete$(fileId: string): Observable<void> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  deleteList$(filesId: string[]): Observable<void[]> {
    const deletes$: Observable<void>[] = [];
    filesId.forEach(id => deletes$.push(this.delete$(id)));
    return combineLatest(deletes$);
  }

  getCurrentFiles$(q?: MyFileGetListQuery): Observable<MyFile[]> {
    const query =  {...{ driveId: this.currentId }, ...q! }
    return this.getList$(query);
  }
  
  get$(id: string): Observable<MyFile> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  getList$(q: MyFileGetListQuery): Observable<MyFile[]> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  getRootFolder(): MyFolder {
    throw new Error('FileService.ts : Method not implemented.');
  }

  moveFiles$(queries: MyFileUpdateQuery[], deletesId: string[]) {
    return combineLatest([
      this.updateList$(queries),
      this.deleteList$(deletesId) 
    ])
  }

  observable(request:any): Observable<any> {
    return new Observable<any> (observer => {
      observer.next(request);
      observer.complete();
    });
  }

  update$(q: MyFileUpdateQuery): Observable<void> {
    throw new Error('FileService.ts : Method not implemented.');
  }

  updateList$(queries: MyFileUpdateQuery[]): Observable<void[]> {
    const updates$: Observable<void>[] = [];
    queries.forEach(query => updates$.push(this.update$(query)));
    return combineLatest(updates$);
  }

}