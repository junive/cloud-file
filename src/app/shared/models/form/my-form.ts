import { MyValueExistValidator } from "./my-input";

export enum MyDialogEnum  {
  KEEP, REPLACE // Selecting
}

export interface MyForm { }

export interface MySubmitForm {
  valid?: boolean;
  save?: boolean;
}

export interface MySingleExistForm extends MyForm {
  value?: string;
  autofocus?: boolean;
  valueExist?: MyValueExistValidator;
  required?: boolean;
}