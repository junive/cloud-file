import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export enum MyDialogEnum  {
  KEEP, REPLACE // Selecting
}

export interface MyDialog { 
  validators?: ValidatorFn[],
  asynchValidators?: AsyncValidatorFn[]
}

export interface MyNamingDialog extends MyDialog {
  name?: string,
}

export interface MySelectingDialog extends MyDialog {
  selected?: MyDialogEnum
}


