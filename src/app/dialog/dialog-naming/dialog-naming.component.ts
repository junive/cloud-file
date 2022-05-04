import { Component, HostListener } from '@angular/core';
import { MyDialogNaming } from 'src/app/dialog/model/my-dialog';
import { MyDialogComponent } from '../model/my-dialog-component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyDialogNamingType } from '../model/my-dialog-type';
import { MyDialogNamingText } from '../model/my-dialog-text';

@Component({
  selector: "my-simple-dialog",
  templateUrl: './dialog-naming.html',
  styleUrls: ['./dialog-naming.css']
})

export class DialogNamingComponent implements MyDialogComponent {
  dialog?: MyDialogNaming;
  text!: MyDialogNamingText

  inputControl: FormControl = new FormControl("", {
    validators: [Validators.required],
    updateOn: 'change' 
  });

  form:FormGroup = this.fb.group({
    myinput: this.inputControl
  });
  
  constructor(private fb: FormBuilder, ) {  }

  ngAfterViewInit() { }

  ngOnInit() { }

  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    return this.save();
  }
  
  get myinput() { 
    return this.form.controls['myinput'];
  }

  setDialog(dialog: MyDialogNaming) {
    this.dialog = dialog;
    this.inputControl.setAsyncValidators(
      this.dialog.validator!.checkFileNames()
    );

    this.setText()
  }

  setText() {
    this.form.setValue({
      myinput: this.dialog!.name ? this.dialog!.name : ""
    })
    if (this.dialog!.type == MyDialogNamingType.ADD) {
      this.text = { title: "Add new folder" }
    } 
    if (this.dialog!.type == MyDialogNamingType.RENAME) {
      this.text = { title: "Rename the file" }
    }
  }

  save() {
    if (!this.form.valid) return;
    this.dialog!.name = this.myinput.value
    this.close();
  }

  dismiss() { }

  close() { }
  
  /*
  getDialog(): MyDialogSimple {
    return this.dialogReact;
  }*/



  


}
