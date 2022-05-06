import { Component } from '@angular/core';
import { MyDialogEnum, MyDialogSelecting } from '../model/my-dialog';
import { MyDialogComponent } from '../model/my-dialog-component';

@Component({ template:"" })
export class DialogSelectingComponent implements MyDialogComponent {
  title: string = "No Select Title";
  subtitle: string = "";
  selections: Map<MyDialogEnum, string> =  new Map<MyDialogEnum, string>()
  dialog!: MyDialogSelecting;

  constructor() { }

  setDialog(dialog: MyDialogSelecting) {
    this.dialog = dialog;
  }

  dismiss() { }
  close() { }
}

