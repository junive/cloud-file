import { Component, Inject } from '@angular/core';
import { FormListener } from 'src/app/shared/services/form.listener';

@Component({
  selector:"my-create-folder",
  template:`<my-dialog-header>Create new folder the file</my-dialog-header>
            <div class="modal-body">
              <my-single-exist-form ></my-single-exist-form>
            </div>
            <my-dialog-footer ></my-dialog-footer>`,
  providers: [
    FormListener
  ]
  //styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class CreateFolderComponent {

  constructor(public formListener: FormListener) { }

  ngOnInit() {
    this.formListener.submit$.next({valid:false});
   }


}

