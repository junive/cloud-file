import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { MyFileGetListQuery } from "../file/my-file-query";
import { MyGetListQuery } from "../http/my-query";

export enum MyDialogEnum  {
  KEEP, REPLACE // Selecting
}

export enum MyActionEnum  {
  KEEP, REPLACE // Selecting
}

export interface MyDialog {
  query?: MyFileGetListQuery,
  name?: string,
  validators?: ValidatorFn[],
  asynchValidators?: AsyncValidatorFn[]
}

export interface MyAction {
}

export interface MyCreateAction extends MyAction {
  query?: MyGetListQuery
}

export interface MyRenameAction extends MyAction {
  name: string,
  query?: MyGetListQuery
}

export interface MyMoveAction {
  selected?: MyActionEnum
}

export interface MyNamingDialog extends MyDialog {
  name?: string,
}

export interface MySelectingDialog extends MyDialog {
  selected?: MyDialogEnum
}


