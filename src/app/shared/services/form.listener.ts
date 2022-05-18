import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { MyForm, MySubmitForm } from "../models/form/my-form";
import { DialogListener } from "./dialog.listener";

@Injectable()
export class FormListener {
  private model: MyForm = {};
  model$: Subject<any> = new Subject();
  submit$: BehaviorSubject<MySubmitForm> = new BehaviorSubject({});

  constructor(  ) { 
    this.submit$ = new BehaviorSubject<MySubmitForm>({});
    this.model$ = new Subject<any>();
   }

  setModel(model : MyForm) {
    this.model = model;
  }

  getModel() {
    return this.model;
  }

  getModel$() {
    return this.model$;
  }

}
