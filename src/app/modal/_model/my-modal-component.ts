import { MyModal } from "./my-modal"

export interface MyModalComponent {
    dismiss(): void
    setModal(dialog: MyModal): void
}

export interface MyDialogComponent extends MyModalComponent {
    close(): void
}