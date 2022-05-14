import { Component, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyNamingDialog } from '../../../models/dialog/my-dialog';

@Component({
  selector:"my-naming-dialog",
  templateUrl:"./naming.html",
  styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class NamingDialogComponent {

  title: string = "No Title"
  myform: FormGroup = new FormGroup({});
  mycontrol: FormControl = new FormControl();  
  dialog: MyNamingDialog = {};

  constructor(
   //  fb: FormBuilder, 
  ) {  }

  ngOnInit() {
    // Dumb name toto mandatory if multiple input...
    this.myform.addControl("toto1", this.mycontrol);
    /*this.myform = this.fb.group({
      "mycontrol": [null] ,
    })*/

  }

  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    return this.save();
  }

  invalidSave() {
    return !this.myform.valid 
      && this.dialog.name != this.mycontrol.value
  }

  setDialog(dialog: MyNamingDialog) {
    this.dialog = dialog;
    this.mycontrol.setValue(this.dialog.name ?? "")
    this.mycontrol.addValidators(dialog.validators!)
    //this.mycontrol.addValidators([Validators.required])

    this.mycontrol.addAsyncValidators(dialog.asynchValidators!);
/*     if (dialog.valueExist) this.mycontrol.addAsyncValidators(
      ValueExistDirective.valid(dialog.valueExist)
    ) */
  }
  
  save() {
    if (this.invalidSave()) return;
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

