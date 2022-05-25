import { MyForm, MyRadioControl, MyTextControl } from "../../shared/models/my-form";

export interface MyNamingFileForm extends MyForm {
  naming: MyTextControl;
}

export interface MyMovingFileForm extends MyForm {
  moving: MyRadioControl;
}
