import { MyForm } from "./my-form";

export enum MyOptionsFile  {
  KEEP, REPLACE // MoveSelecting
}

export interface MyMoveOptionFileForm extends MyForm {
  selected: MyOptionsFile;
}