import { Observable } from "rxjs";
import { MyFile } from "src/app/file/model/my-file";
import { DialogValidator } from "../dialog.validator";
import { MyDialogSelectingType, MyDialogType } from "./my-dialog-type";

export interface MyDialog {
    type: MyDialogType
}

export interface MyDialogNaming extends MyDialog {
    name?: string
    validator?: DialogValidator
}

export interface MyDialogSelecting extends MyDialog {
    selected?: MyDialogSelectingType
}


