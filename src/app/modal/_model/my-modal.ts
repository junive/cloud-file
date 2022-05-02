import { AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { MyFile } from "src/app/file/model/my-file";

export interface MyModal {
    title?: string
}

export interface MyDialogInput extends MyModal {
    name?: string
    files$?: Observable<MyFile[]>
}

export interface MyDialogSelect extends MyModal {
    subtitle?: string
    selected?: string
    selection?: Map<string, string>
}


