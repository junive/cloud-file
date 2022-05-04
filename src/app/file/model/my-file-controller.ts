import { Observable } from "rxjs";
import { MyFile, MyFolder } from "./my-file";

export interface MyFileController {
    currentId:string;
    addFolder$(name: string, parentId: string): Observable<void>;
    deleteFile$(fileId: string): Observable<void>;
    getFile$(q: MyFileQuery): Observable<MyFile>;
    getFiles$(q: MyFileQuery): Observable<MyFile[]>;
    //getFilesByIds$(filesId: string[]): Observable<MyFile[]>;
   // getFilesByNames$(folderId: string, names: string[]):  Observable<MyFile[]>;
   // getCurrentFiles$(): Observable<MyFile[]>;
    getRootFolder(): MyFolder;
   // moveFiles$(filesId: string[], targetFolderId: string ) : Observable<void>;
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
