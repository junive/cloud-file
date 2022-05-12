import { MyDialog } from "./my-dialog"

export interface MyDialogComponent {
    close(): void;
    dismiss(): void; 
    setDialog(dialog: MyDialog): void;
}