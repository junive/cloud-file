export type MyDialogType = 
    MyDialogNamingType | 
    MyDialogSelectingType

export enum MyDialogNamingType  {
    RENAME,  ADD
}

export enum MyDialogSelectingType {
    MOVE, MOVE_KEEP, MOVE_REPLACE
}