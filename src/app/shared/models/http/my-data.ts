import { Observable } from "rxjs";
import { MyFolder } from "../file/my-file";
import { MyCreateQuery, MyGetListQuery, MyUpdateQuery } from "./my-query";

export interface MyData {
    id: string
}

export interface MyDataService {
    create$(q: MyCreateQuery): Observable<void>;
    delete$(id: string): Observable<void>;
    get$(id: string): Observable<MyData>;
    getList$(q: MyGetListQuery): Observable<MyData[]>;
    update$(q: MyUpdateQuery): Observable<void>;
}
