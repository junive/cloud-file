import { Observable } from "rxjs";
import { MyFileList } from "../_helper/file-list.helper";
import { MyFile } from "./my-file";

export interface MyFileService {
    getRootFiles(fileList: MyFileList):Observable<MyFile[]>;
    addFiles():void;
}
