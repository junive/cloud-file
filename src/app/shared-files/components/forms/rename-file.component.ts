import { Component } from '@angular/core';
import { FormService } from '../../../shared/services/form.service';

@Component({
  selector:"my-rename-file",
  template:`
    <my-dialog-header>Rename the file</my-dialog-header>
    <div class="modal-body">
    <form [formGroup]="service.form">
      <input #myinput type="text"
        class="form-control" 
        [formControl]="$any(service.model).naming.control"
        ngbAutofocus
      />
      <my-error-control
        [input]="myinput"
        [control]="$any(service.model).naming.control"
      ></my-error-control>
    </form>
    </div>
    <my-dialog-footer ></my-dialog-footer>
  `,
  styleUrls: ['../../../../assets/scss/files/form.css']
})
export class RenameFileComponent {

  constructor(public service: FormService) { }

}

