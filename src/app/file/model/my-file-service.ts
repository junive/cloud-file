import { Observable } from "rxjs";
import { MyFile, MyFolder } from "./my-file";

export interface MyFileService {
    create$(q: MyFileQuery): Observable<void>;
    deleteFile$(fileId: string): Observable<void>;
    getFile$(q: MyFileQuery): Observable<MyFile>;
    getFiles$(q: MyFileQuery): Observable<MyFile[]>;
    getRootFolder(): MyFolder;
    updateFile$(q:MyFileQuery): Observable<void>;
}

export interface MyFileQuery {
    driveId?: string;
    fileId?:string;
    filesId?: string[];
    name?:string;
    names?: string[];
    orderBy?: string;
    parentId?: string;
    targetId?: string;
}
