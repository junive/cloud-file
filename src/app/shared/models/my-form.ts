import { AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";


export enum MyRadioValue {
  EMPTY,
  KEEP, REPLACE // MoveSelecting
}

export interface MyForm { }

export interface MySubmitForm extends MyForm {
  save?: boolean;
}

export interface MyControl {
  value?: any;
  asyncs?: AsyncValidatorFn[];
  validators?: ValidatorFn[];
  control?: FormControl;
}

export interface MyTextControl extends MyControl {
  value?: string;
}

export interface MyRadioControl extends MyControl {
  value?: MyRadioValue;
}


