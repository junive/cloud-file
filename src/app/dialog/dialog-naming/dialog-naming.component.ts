import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyDialogNaming } from '../model/my-dialog';

@Component({ template:""})
export class DialogNamingComponent {

  title: string = "No Naming Title"
  dialog: MyDialogNaming = {};
  myform: FormGroup = new FormGroup({});

  constructor(public fb: FormBuilder, ) {  }

  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    return this.save();
  }

  setDialog(dialog: MyDialogNaming) {
    this.dialog = dialog;
    this.myform = this.fb.group({
      "myinput": [null] 
    })
    this.myform.setValue({
      "myinput": this.dialog.name ? this.dialog.name : ""
    })
  }
  
  save() {
    if (!this.myform.valid) return;
    this.dialog!.name = this.myform.controls['myinput'].value;
    this.close();
  }

  close(): void { }
  dismiss(): void { }



/*
  get myinput() {
    return this.myform.controls['myinput'] as FormControl;
  }
  

 
  
  /*
  getDialog(): MyDialogSimple {
    return this.dialogReact;
  }*/



  


}

