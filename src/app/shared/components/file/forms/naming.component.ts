import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyTextControl } from 'src/app/shared/models/abstract/my-form';
import { MyNamingFileForm } from 'src/app/shared/models/file/my-file-form';
import { FormListener } from '../../../listeners/form.listener';

@Component({
  selector:"my-naming-body-file",
  template:`<form [formGroup]="listen.form">
              <input #myinput type="text"
                class="form-control" 
                [formControl]="$any(listen.model).naming.control"
                ngbAutofocus
              />
              <my-error-control
                [input]="myinput"
                [control]="$any(listen.model).naming.control"
              ></my-error-control>
            </form> `
  //styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class NamingFileComponent {

 // model!: MyNamingFileForm;
 // naming: FormControl = new FormControl();  
 
  constructor(public listen: FormListener) { }

  ngOnInit() {
    
   // this.listen.form.addControl("my-single", this.naming);
    //this.model = <MyNamingFileForm> this.listen.model;
    //this.control.setValue(this.model.naming.value ?? "");
    //this.control.addAsyncValidators(this.model.naming.asyncs!);
    //this.control.addValidators(this.model.naming.validators!);

/*     this.listen.submit$.subscribe(submit => {
      if (!submit.save) return;
     // console.log("save", submit.save)
     this.listen.setValues();
     
     // (<any>this.listen.model).naming.value = (<any>this.listen.model).naming.control!.value;
      this.listen.model$.next(this.listen.model);
    }); */
  }

}

