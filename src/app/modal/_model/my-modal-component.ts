import { MyModal } from "./my-modal"
import { MyDialogError } from "./my-dialog-error"

export interface MyModalComponent {
    dismiss(): void
    setModal(dialog: MyModal): void
}

export interface MyDialogComponent extends MyModalComponent {
    close(): void
}

export interface MyDialogInputComponent extends MyDialogComponent {
    setError(dialogError: MyDialogError): void
}