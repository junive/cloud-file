import { Component, OnInit } from '@angular/core';
import { MyDialogSelect } from '../_model/my-modal';
import { MyDialogComponent } from '../_model/my-modal-component';

@Component({
  selector: 'my-dialog-select',
  templateUrl: './dialog-select.html',
  styleUrls: ['./dialog-select.css']
})
export class DialogSelectComponent implements MyDialogComponent {

  dialog!: MyDialogSelect;

  constructor() { }

  setModal(dialog: MyDialogSelect) {
    this.dialog = dialog;
  }

  dismiss() { }
  close() { }
}
