import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MySingleExistForm } from '../../models/form/my-form';
import { FormListener } from '../../services/form.listener';


@Component({
  selector:"my-single-exist-form",
  template:`<form [formGroup]="form">
              <input type="text"
                class="form-control" 
                [formControl]="control"
                [valueExist]="model.valueExist!"
                [required]="model.required!"
                [attr.ngbAutofocus]="model.autofocus"
                [attr.autofocus]="model.autofocus" 
              />
              <my-error-control
                [control]="control"
                [validForm]="validForm()"
              ></my-error-control>
            </form>`
  //styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class SingleExistFormComponent {
  
 // @Input() model$!: BehaviorSubject<MySingleExistForm  | undefined>;
  //@Input() submit$!: BehaviorSubject<MySubmitForm>;
  model!: MySingleExistForm;
  form: FormGroup = new FormGroup({});
  control: FormControl = new FormControl();  
  
  constructor(private listen: FormListener) {   }

  ngOnInit() {
    this.form.addControl("my-single", this.control);
    this.model = <MySingleExistForm> this.listen.getModel();
    this.control.setValue(this.model.value ?? "");
    /*this.formService.model$.subscribe(model => { // Init only once
      //if (this.model) return;
      this.model = model;
      this.control.setValue(model.single.value ?? "");
      this.formService.model$.complete();
      //this.model$.next(undefined); // Consumed
    })*/
    
    this.form.statusChanges.subscribe(changes => { 
      //const save = this.submit$.getValue().save
        //console.log(changes, this.validForm());
        this.listen.submit$.next({valid: this.validForm()});
        //return this.validForm() ? this.submit$ : EMPTY
    })
    this.listen.submit$.subscribe(submit => {
      if (!submit.save) return;
      console.log("save", submit.save)
      this.model.value = this.control.value;
      this.listen.model$.next(this.model);
    });
  }

  validForm(): boolean {
    return this.form.valid || this.model.value == this.control.value
  }
 
  changeSingle() {
    //console.log("changes");
    //console.log("single: ", this.singleControl.value)
    //this.model.single!.value = this.singleControl.value;
    //this.model.valid = this.validForm()
    //this.changeEvent.emit(this.model);
  }

}

