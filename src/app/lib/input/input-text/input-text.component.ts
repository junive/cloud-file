import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn,  FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { distinctUntilChanged, EMPTY, map, Observable, of, switchMap, take, timer } from 'rxjs';
import { MyFile } from 'src/app/file/model/my-file';
import { MyInputText } from '../model/my-input-text';

@Component({
  selector: 'my-input-text',
  templateUrl: './input-text.html',
  styleUrls: ['../input.css']
})
export class InputTextComponent{
  //@Input() mycontrol: FormControl = new FormControl();
  @Input() form: FormGroup = new FormGroup({});
  @Input() controlName: string = "";
  @Input() name: string = "";
  @Input() autofocus: boolean = false;
  @Input() validator: MyInputText = {};


  constructor(  ) { }
  
  ngOnInit(): void {
   //this.formGroup = <FormGroup>this.controlContainer.control;
   
    //console.log("Input", this.form);
    /*this.control = new FormControl("", {
      validators: [Validators.required],
      updateOn: 'change' 
    });*/
  
  }

  get mycontrol() {
    return this.form.controls[this.controlName] as FormControl;
  }

  ngAfterViewInit() {
    if (this.validator.required) {
      this.mycontrol.addValidators([Validators.required])
    }
    if (this.validator.file!.hasTwin) {
      this.mycontrol.addAsyncValidators( [ this.checkFileNames() ] )
    }
  }

  checkFileNames() : AsyncValidatorFn  {
    return (control: AbstractControl) : Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      return timer(100).pipe(
        switchMap( () => ( this.validator.file!.hasTwin ) ?
          this.validator.file!.service.getCurrentFiles$() : EMPTY
        ),
        //debounceTime(200),
        distinctUntilChanged(),
        take(1),
        map( (files: MyFile[]) => {
          const exist = files.some(file => file.name == control.value);
          return exist ? { fileExist: true } : null;
        }),
      )
    }
  }

}
