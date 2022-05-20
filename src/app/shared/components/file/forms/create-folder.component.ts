import { Component, Inject } from '@angular/core';

import { FormListener } from '../../../listeners/form.listener';

@Component({
  selector:"my-create-folder",
  template:`<my-dialog-header>Create new folder the file</my-dialog-header>
            <div class="modal-body">
              <form [formGroup]="listen.form">
                <input #myinput type="text"
                  class="form-control" 
                  [formControl]="$any(listen.model).naming.control"
                  ngbAutofocus
                />
                <my-error-control
                  [input]="myinput"
                  [control]="$any(listen.model).naming.control"
                ></my-error-control>
              </form>
            </div>
            <my-dialog-footer ></my-dialog-footer>`,
  //styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class CreateFolderComponent {

  constructor(public listen: FormListener) { }

}

