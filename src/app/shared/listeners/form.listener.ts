import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { BehaviorSubject, Subject } from "rxjs";
import { MyControl, MyForm, MySubmitForm } from "../models/abstract/my-form";

@Injectable()
export class FormListener {
  model: MyForm = {};
  form: FormGroup = new FormGroup({});
  model$: Subject<any> = new Subject();
  //submit$: BehaviorSubject<MySubmitForm> = new BehaviorSubject({});

  constructor( ) {  }

  init(model?: MyForm) {
    //this.submit$.unsubscribe();
    this.model$.unsubscribe();
    //this.submit$ = new BehaviorSubject<MySubmitForm>({});
    this.model$ = new Subject<any>();
    this.form = new FormGroup({});
    if (!model) return;
    this.model = model;
    let sequence = 0;
    for (const key in this.model) {
      const input = (<any>this.model[ key as keyof MyForm])
      if (!input) return;
      input.control = new FormControl();
      this.form.addControl("contol"+sequence++, input.control);
      input.control.setValue(input.value);
      input.control.addValidators(input.validators);
      input.control.addAsyncValidators(input.asyncs);
    }
  }

   save() {
    for (const key in this.model) {
      const input = (<any>this.model[ key as keyof MyForm]);
      if (!input || !input.control) return;
      input.value = input.control.value;
    }
    this.model$.next(this.model);
   //(<any>this.listen.model).naming.value = (<any>this.listen.model).naming.control!.value;
  } 

}
