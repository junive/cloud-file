import { Observable } from "rxjs";
import { MyFileList } from "../_helper/my-file-list";
import { MyFile } from "./my-file";

export interface MyFileManagerService {
    getRootFiles(fileList: MyFileList):Observable<MyFile[]>;
    addFiles():void;
}
