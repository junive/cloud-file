import { MyDialogType } from "./my-dialog-type";

export interface MyDialogNamingText {
    title:string,
}

export interface MyDialogSelectingText {
    title: string,
    subtitle: string,
    selections: Map<MyDialogType, string>
}

