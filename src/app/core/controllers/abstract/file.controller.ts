import { Observable } from "rxjs";
import { MyFileController } from "../../../shared-files/models/my-file-controller";
import { MyFile, MyFolder } from "../../../shared-files/models/my-file";
import { MyFileCreateQuery, MyFileGetListQuery, MyFileUpdateQuery } from "../../../shared-files/models/my-file-query";
import { Controller } from "./controller";

export abstract class FileController extends Controller implements MyFileController{

  constructor() { super(); }

  abstract override create$(q: MyFileCreateQuery): Observable<void>;
  abstract override delete$(id: string): Observable<void>;
  abstract override get$(id: string): Observable<MyFile>;
  abstract override getList$(q: MyFileGetListQuery):Observable<MyFile[]>;
  abstract override update$(q: MyFileUpdateQuery): Observable<void>;

  override deleteList$(filesId: string[]): Observable<void[]> {
    return super.deleteList$(filesId);
  }

  override moveList$(queries: MyFileUpdateQuery[], deletesId: string[]) {
    return super.moveList$(queries, deletesId)
  } 

  override updateList$(queries: MyFileUpdateQuery[]): Observable<void[]> {
    return super.updateList$(queries);
  }

  getRootFolder(): MyFolder {
    throw new Error("Method not implemented.");
  }
}