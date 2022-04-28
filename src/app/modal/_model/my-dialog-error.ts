export interface MyDialogError{ }

export interface MyDialogSimpleError extends MyDialogError {
    message: string;
}