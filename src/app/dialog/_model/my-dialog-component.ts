import { MyDialog } from "./my-dialog"
import { MyDialogError } from "./my-dialog-error"

export interface MyDialogComponent {
    //getDialog(): MyDialog
    dismiss(): void
    setDialog(dialog: MyDialog): void
}

export interface MyDialogSaveComponent extends MyDialogComponent {
    close(): void
    setError(dialogError: MyDialogError): void
}