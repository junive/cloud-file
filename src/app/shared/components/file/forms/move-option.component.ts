import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyRadioControl, MyRadioValue } from 'src/app/shared/models/abstract/my-form';
import { MyMovingFileForm } from 'src/app/shared/models/file/my-file-form';
import { FormListener } from '../../../listeners/form.listener';

@Component({
  selector:"my-move-option-file",
  template:`<my-dialog-header>Import Options</my-dialog-header>
            <div class="modal-body">
              <p>One or more elements already exist</p>
              <div *ngFor="let elem of selections | keyvalue"
                class="form-check"
              >
                <input  type="radio" 
                  class="form-check-input" 
                  [value]="elem.key"
                  [formControl]="control"
                >
                <label class="form-check-label" 
                  (click)="control.setValue(elem.key)"
                >
                  {{elem.value}}
                </label>
              </div>
            </div>
            <my-dialog-footer ></my-dialog-footer>`,
/*   providers: [
    FormListener
  ] */
  //styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class MoveOptionFileComponent {
  selections: Map<MyRadioValue, string> 
  control: FormControl;

  constructor(public listen: FormListener )  {
    //(<any>this.listen.model).moving.value = MyRadioValue.KEEP
    this.control = (<MyMovingFileForm> this.listen.model).moving.control!;
    this.selections = new Map<MyRadioValue, string>();
    this.selections.set(MyRadioValue.REPLACE, "Replace Existing files");
    this.selections.set(MyRadioValue.KEEP, "Keep all files");
  }

  ngOnInit() {
   // this.listener.submit$.next({valid:true});
/*     this.listener.submit$.subscribe(submit => {
        if (!submit.save) return;
        this.listener.model$.next(this.model);
    }); */
  }

}

