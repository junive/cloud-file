import { Component, HostListener } from '@angular/core';
import { MyDialogSaveInput } from 'src/app/dialog/_model/my-dialog';
import { MyDialogSaveComponent } from '../_model/my-dialog-component';
import { MyDialogSimpleError } from '../_model/my-dialog-error';

@Component({
  selector: "my-simple-dialog",
  templateUrl: './dialog-save-input.html',
  styleUrls: ['./dialog-save-input.css']
})

export class DialogSaveInputComponent implements MyDialogSaveComponent {
  dialog?: MyDialogSaveInput;
  dialogError?: MyDialogSimpleError;
  
  constructor( ) {  }

  ngAfterViewInit() { }

/* 
  @HostListener('document:keydown.escape', ['$event']) 
  onEscapeHandler(event: KeyboardEvent) {
    console.log("es")
    return this.dismiss();
  }
 */

  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    return this.close();
  }

  setDialog(dialog: MyDialogSaveInput) {
    this.dialog = dialog;
  }

  setError(dialogError: MyDialogSimpleError): void {
    this.dialogError = dialogError;
  }

  dismiss() { }

  close() { }
  
  /*
  getDialog(): MyDialogSimple {
    return this.dialogReact;
  }*/





  






}