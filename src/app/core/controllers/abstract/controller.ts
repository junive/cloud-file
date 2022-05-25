import { combineLatest, Observable } from "rxjs";
import { MyController } from "../../../shared/models/my-controller";
import { MyCreateQuery, MyGetListQuery, MyUpdateQuery } from "../../../shared/models/my-query";
import { MyData } from "../../../shared/models/my-data";

export abstract class Controller implements MyController {

  constructor() {   }

  abstract create$(q: MyCreateQuery): Observable<void>;
  abstract delete$(id: string): Observable<void>;
  abstract get$(id: string): Observable<MyData>;
  abstract getList$(q: MyGetListQuery): Observable<MyData[]>;
  abstract update$(q: MyUpdateQuery): Observable<void>;

  deleteList$(ids: string[]): Observable<void[]> {
    const deletes$: Observable<void>[] = [];
    ids.forEach(id => deletes$.push(this.delete$(id)));
    return combineLatest(deletes$);
  }

  moveList$(queries: MyUpdateQuery[], deletesId: string[]) {
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

  updateList$(queries: MyUpdateQuery[]): Observable<void[]> {
    const updates$: Observable<void>[] = [];
    queries.forEach(query => updates$.push(this.update$(query)));
    return combineLatest(updates$);
  }
}