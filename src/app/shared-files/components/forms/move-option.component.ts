import { Component } from '@angular/core';
import { MyRadioValue } from '../../../shared/models/my-form';
import { FormService } from '../../../shared/services/form.service';

@Component({
  selector:"my-move-option-file",
  template:`
    <my-dialog-header>Import Options</my-dialog-header>
    <div class="modal-body">
      <p>One or more elements already exist</p>
      <div *ngFor="let radio of moveRadios"
        class="form-check"
      >
        <input  type="radio" 
          class="form-check-input" 
          [value]="radio"
          [formControl]="$any(service.model).moving.control"
        >
        <label class="form-check-label" 
          (click)="$any(service.model).moving.control.setValue(radio)"
        >
          <span *ngIf="radio == radios.REPLACE">
            Replace Existing files
          </span>
          <span *ngIf="radio == radios.KEEP">
            Keep all Files
          </span>
        </label>
      </div>
    </div>
    <my-dialog-footer ></my-dialog-footer>`,

  styleUrls: ['../../../../assets/scss/files/form.css']
})
export class MoveOptionFileComponent {
  radios = MyRadioValue;
  moveRadios: MyRadioValue[] = [this.radios.REPLACE, this.radios.KEEP];

  constructor(public service: FormService )  { }
}

