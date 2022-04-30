import { Observable } from "rxjs";
import { MyFile, MyFolder } from "./my-file";

export interface MyFileController {
    addFolder(name: string, parentId: string): Observable<void>;
    deleteFiles(filesId: string[]): Observable<void>;
    getFile(fileId: string): Observable<MyFile>;
    getFiles(folderId?: string): Observable<MyFile[]>;
    getRootFolder(): MyFolder
    moveFiles(filesId: string[], targetFolderId: string ) : Observable<void>;
    updateFiles(file: MyFile[]): Observable<void>;
}
