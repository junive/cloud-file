import { Component } from '@angular/core';
import { MyDialogSelecting } from '../model/my-dialog';
import { MyDialogComponent } from '../model/my-dialog-component';
import { MyDialogSelectingText } from '../model/my-dialog-text';
import { MyDialogSelectingType } from '../model/my-dialog-type';

@Component({
  selector: 'my-dialog-select',
  templateUrl: './dialog-selecting.html',
  styleUrls: ['./dialog-selecting.css']
})
export class DialogSelectingComponent implements MyDialogComponent {

  dialog!: MyDialogSelecting;
  text!: MyDialogSelectingText;
  Type = MyDialogSelectingType;

  constructor() { }

  setDialog(dialog: MyDialogSelecting) {
    this.dialog = dialog;
    this.setText();
  }

  setText() {
    if (this.dialog.type == this.Type.MOVE) {
      this.text = {
        title: "Import Options",
        subtitle: "One or more elements already exist",
        selections: new Map<MyDialogSelectingType, string>([
          [this.Type.MOVE_REPLACE, "Replace Existing files"],
          [this.Type.MOVE_KEEP, "Keep all files"]
        ])
      }
      this.dialog.selected = this.Type.MOVE_REPLACE;
    }
  }

  dismiss() { }
  close() { }
}
