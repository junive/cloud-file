import { Component, Inject } from '@angular/core';
import { FormListener } from 'src/app/shared/services/form.listener';
import { MyForm } from '../../../models/form/my-form';

@Component({
  selector:"my-rename-file",
  template:`<my-dialog-header>Rename the file</my-dialog-header>
            <div class="modal-body">
              <my-single-exist-form ></my-single-exist-form>
            </div>
            <my-dialog-footer ></my-dialog-footer>`,
  providers: [
    FormListener
  ]
  //styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class RenameFileComponent {
 // model: MySingleExistForm = {};
  //save$: Subject<MySingleExistForm> = new Subject<MySingleExistForm>()
 // model$!: BehaviorSubject<MySingleExistForm | undefined>;
 // submit$!: BehaviorSubject<MySubmitForm>;
  

 constructor(public formListener: FormListener) { }

 ngOnInit() {
   this.formListener.submit$.next({valid:true});
 
    /*
    this.formService.submit$.pipe(
      concatMap(submit => {
        console.log("rename: ", submit.valid && submit.save)
        return submit.valid && submit.save ?
          this.model$ : EMPTY;
      }),
      tap(model =>
        console.log(model)
      )
    ).subscribe();
    */
  }



  setModel(model: MyForm) {
    //console.log(model);
   // this.model$.next(<MySingleExistForm> model);
   // this.model$ = new BehaviorSubject<MySingleExistForm>(model);

  }

 

  save() {
    //this.save$.next();
    //if (!this.model.valid) return;
   // this.dialogService.close();
  }



}

