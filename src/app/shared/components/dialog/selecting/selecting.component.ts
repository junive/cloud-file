import { Component } from '@angular/core';
import { MyDialogEnum, MySelectingDialog } from '../../../models/dialog/my-dialog';
import { MyDialogComponent } from '../../../models/dialog/my-dialog-component';

@Component({ 
  selector:"my-selecting-dialog",
  templateUrl:"./selecting.html",
  styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class SelectingDialogComponent implements MyDialogComponent {
  title: string = "No Select Title";
  subtitle: string = "";
  selections: Map<MyDialogEnum, string> = new Map<MyDialogEnum, string>()
  dialog: MySelectingDialog = {};

  constructor() { }

  setDialog(dialog: MySelectingDialog) {
    this.dialog = dialog;
  }

  dismiss() { }
  close() { }
}

