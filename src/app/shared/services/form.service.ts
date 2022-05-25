import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { MyForm } from "../models/my-form";

@Injectable()
export class FormService {
  model: MyForm = {};
  form: FormGroup = new FormGroup({});
  model$: Subject<any> = new Subject();

  constructor( ) {  }

  init(model?: MyForm) {
    this.model$.unsubscribe();
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
  } 

}
