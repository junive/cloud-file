import { Component, Inject } from '@angular/core';
import { FormListener } from 'src/app/shared/services/form.listener';
import { MyMoveOptionFileForm, MyOptionsFile } from 'src/app/shared/models/form/my-file-form';

@Component({
  selector:"my-move-option-file",
  template:`<my-dialog-header>Import Options</my-dialog-header>
            <div class="modal-body">
              <p>One or more elements already exist</p>
              <div *ngFor="let select of selections | keyvalue"
                class="form-check"
              >
                <input class="form-check-input" 
                  type="radio" 
                  name="flexRadioDefault" 
                  [checked]="model.selected == select.key"
                  [value]="select.key"
                  [(ngModel)]="model.selected"
                >
                <label class="form-check-label" 
                  (click)="model.selected = select.key"
                >
                  {{select.value}}
                </label>
              </div>
            </div>
            <my-dialog-footer ></my-dialog-footer>`,
  providers: [
    FormListener
  ]
  //styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class MoveOptionFileComponent {
  model: MyMoveOptionFileForm = {selected:MyOptionsFile.KEEP};
  selections: Map<MyOptionsFile, string> 

  constructor(public formListener: FormListener ) { 
    this.selections = new Map<MyOptionsFile, string>();
    this.selections.set(MyOptionsFile.REPLACE, "Replace Existing files");
    this.selections.set(MyOptionsFile.KEEP, "Keep all files");
   // this.submit$ = new BehaviorSubject<MySubmitForm>({});
    // this.model$ = new BehaviorSubject<MySingleExistForm | undefined>(undefined)
  }


  ngOnInit() {
    this.formListener.submit$.next({valid:true});
    this.formListener.submit$.subscribe(submit => {
        if (!submit.save) return;
        this.formListener.model$.next(this.model);
    });
  }



}

