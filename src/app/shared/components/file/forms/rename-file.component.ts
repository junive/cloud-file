import { Component } from '@angular/core';
import { FormListener } from '../../../listeners/form.listener';

@Component({
  selector:"my-rename-file",
  template:`<my-dialog-header>Rename the file</my-dialog-header>
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
/*   providers: [
    FormListener
  ] */
  //styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class RenameFileComponent {

 constructor(public listen: FormListener) { }

  ngOnInit() {
   // this.listener.submit$.next({valid:true});
  }

}

