import { combineLatest, Observable } from "rxjs";
import { MyFile, MyFolder } from "src/app/shared/models/file/my-file";
import { MyFileController } from "src/app/shared/models/file/my-file-controller";
import { MyFileCreateQuery, MyFileGetListQuery, MyFileUpdateQuery } from "src/app/shared/models/file/my-file-query";


export class FileController implements MyFileController{

  constructor() {   }

  create$(q: MyFileCreateQuery): Observable<void> {
    throw new Error("Method not implemented.");
  }
  delete$(id: string): Observable<void> {
    throw new Error("Method not implemented.");
  }
  get$(id: string): Observable<MyFile> {
    throw new Error("Method not implemented.");
  }
  getList$(q: MyFileGetListQuery): Observable<MyFile[]> {
    throw new Error("Method not implemented.");
  }
  getRootFolder(): MyFolder {
    throw new Error("Method not implemented.");
  }
  update$(q: MyFileUpdateQuery): Observable<void> {
    throw new Error("Method not implemented.");
  }


  deleteList$(filesId: string[]): Observable<void[]> {
    const deletes$: Observable<void>[] = [];
    filesId.forEach(id => deletes$.push(this.delete$(id)));
    return combineLatest(deletes$);
  }

  moveFiles$(queries: MyFileUpdateQuery[], deletesId: string[]) {
    return combineLatest([
      this.updateList$(queries),
      this.deleteList$(deletesId) 
    ])
  } 

  updateList$(queries: MyFileUpdateQuery[]): Observable<void[]> {
    const updates$: Observable<void>[] = [];
    queries.forEach(query => updates$.push(this.update$(query)));
    return combineLatest(updates$);
  }


}