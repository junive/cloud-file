import { Observable } from "rxjs";
import { MyData } from "./my-data";
import { MyCreateQuery, MyGetListQuery, MyUpdateQuery } from "./my-query";

export interface MyController {
    create$(q: MyCreateQuery): Observable<void>;
    delete$(id: string): Observable<void>;
    get$(id: string): Observable<MyData>;
    getList$(q: MyGetListQuery): Observable<MyData[]>;
    update$(q: MyUpdateQuery): Observable<void>; 
}
