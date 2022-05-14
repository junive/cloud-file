import { Observable } from "rxjs";
import { MyFile, MyFolder } from "./my-file";
import { MyFileCreateQuery, MyFileGetListQuery, MyFileUpdateQuery } from "./my-file-query";

export interface MyFileController {
  create$(q: MyFileCreateQuery): Observable<void>;
  delete$(id: string): Observable<void>;
  get$(id: string): Observable<MyFile>;
  getList$(q: MyFileGetListQuery): Observable<MyFile[]>;
  getRootFolder(): MyFolder;
  update$(q: MyFileUpdateQuery): Observable<void>;
}