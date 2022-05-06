import { Observable } from "rxjs";
import { FileService } from "src/app/file/service/file.service";
import { MyFile } from "src/app/file/model/my-file";


export enum MyDialogEnum  {
    KEEP, REPLACE // Selecting
}

export interface MyDialog { }

export interface MyDialogNaming extends MyDialog {
    name?: string
    fileService?: FileService
}

export interface MyDialogSelecting extends MyDialog {
    selected?: MyDialogEnum
}


