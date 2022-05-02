import { Component, HostListener } from '@angular/core';
import { MyDialogInput } from 'src/app/modal/_model/my-modal';
import { MyDialogComponent } from '../_model/my-modal-component';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, of, pipe, Subject, switchMap, take, timer } from 'rxjs';
import { MyFile } from 'src/app/file/model/my-file';

@Component({
  selector: "my-simple-dialog",
  templateUrl: './dialog-input.html',
  styleUrls: ['./dialog-input.css']
})

export class DialogInputComponent implements MyDialogComponent {
  dialog?: MyDialogInput;

  inputControl: FormControl = new FormControl("", {
    validators: [Validators.required],
    updateOn: 'change' 
  });

  form:FormGroup = this.fb.group({
    myinput: this.inputControl
  });
  
 
  constructor(private fb: FormBuilder, ) {  }

  ngAfterViewInit() { }

  ngOnInit() {
    
  }



/* 
  @HostListener('document:keydown.escape', ['$event']) 
  onEscapeHandler(event: KeyboardEvent) {
    console.log("es")
    return this.dismiss();
  }
 */

  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    return this.save();
  }

  get myinput() { 
    return this.form.controls['myinput'];
  }

  isUniqueName(dialog: MyDialogInput) : AsyncValidatorFn  {
    return function(control: AbstractControl) : Observable<ValidationErrors | null> {
      if (!control.value) return of(null);
      return control.valueChanges.pipe(
        switchMap(() => dialog.files$!),
        debounceTime(200),
        distinctUntilChanged(),
        take(1),
        map( (files:MyFile[]) => {
          const nameExist = files.some(file => file.name == control.value);
          return nameExist ? { fileExist:true} : null
        }),
      )
    }
  }

  setModal(dialog: MyDialogInput) {
    this.dialog = dialog;
    this.inputControl.addAsyncValidators(
      this.isUniqueName(dialog)
    ); 
    this.form.setValue({
      myinput: this.dialog.name ? dialog.name : ""
    })
  }

  save() {
    if (!this.form.valid) return;
    this.dialog!.name = this.form.value.myinput
    this.close();
  }

  dismiss() { }

  close() { }
  
  /*
  getDialog(): MyDialogSimple {
    return this.dialogReact;
  }*/



  


}
