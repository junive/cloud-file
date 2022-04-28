import { Component, HostListener } from '@angular/core';
import { MyDialogInput } from 'src/app/modal/_model/my-modal';
import { MyDialogInputComponent } from '../_model/my-modal-component';
import { MyDialogSimpleError } from '../_model/my-dialog-error';

@Component({
  selector: "my-simple-dialog",
  templateUrl: './dialog-input.html',
  styleUrls: ['./dialog-input.css']
})

export class DialogInputComponent implements MyDialogInputComponent {
  dialog?: MyDialogInput;
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

  setModal(dialog: MyDialogInput) {
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