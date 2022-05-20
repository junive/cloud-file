import { MyForm, MyRadioControl, MyTextControl } from "../abstract/my-form";

export interface MyNamingFileForm extends MyForm {
  naming: MyTextControl;
}

export interface MyMovingFileForm extends MyForm {
  moving: MyRadioControl;
}
