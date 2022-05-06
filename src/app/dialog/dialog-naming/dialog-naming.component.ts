import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { MyDialogNaming } from '../model/my-dialog';

@Component({ template:""})
export class DialogNamingComponent {

  title: string = "No Naming Title"
  myform: FormGroup = new FormGroup({});
  mycontrol: FormControl = new FormControl();  
  dialog: MyDialogNaming = {};
  
  constructor(
   //  fb: FormBuilder, 
  ) {  }

  ngOnInit() {
    this.myform.addControl("", this.mycontrol);
    /*this.myform = this.fb.group({
      "mycontrol": [null] ,
    })*/

  }



  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    return this.save();
  }

  setDialog(dialog: MyDialogNaming) {
    this.dialog = dialog;
    this.mycontrol.setValue(this.dialog.name ?? "")
  }
  
  save() {
    if (!this.myform.valid) return;
    this.dialog.name = this.mycontrol.value;
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

