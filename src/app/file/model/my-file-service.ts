import { Observable } from "rxjs";
import { MyFile, MyFolder } from "./my-file";

export interface MyFileService {
    create$(q: MyFileCreateQuery): Observable<void>;
    deleteFile$(fileId: string): Observable<void>;
    getFile$(q: MyFileGetQuery): Observable<MyFile>;
    getFiles$(q: MyFileGetQuery): Observable<MyFile[]>;
    getRootFolder(): MyFolder;
    updateFile$(q: MyFileUpdateQuery): Observable<void>;
}

export interface MyFileQuery { }

export interface MyFileCreateQuery extends MyFileQuery {
    driveId?: string;
    name?:string;
}

export interface MyFileGetQuery extends MyFileQuery {
    fileId?: string;
    driveId?: string;
    filesId?: string[];
    names?: string[];
    orderBy?: string;
}

export interface MyFileUpdateQuery extends MyFileQuery {
    fileId?:string;
    name?:string;
    targetId?: string;
}
