import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { MyDialog} from "./_model/my-dialog";
import { MyDialogSaveComponent, MyDialogComponent } from "./_model/my-dialog-component";
import { MyDialogError } from "./_model/my-dialog-error";

@Injectable()
export class DialogService {

  saveResponse: Subject<MyDialogError> = new Subject<MyDialogError>();
  modalRef?: NgbModalRef;

  constructor( private modalService: NgbModal ) {  }

  ngOnInit() { }
  
  openDialog( DialogComponent: any, dialog : MyDialog) : void {
    this.modalRef = this.modalService.open(
      DialogComponent, { centered: true }
    );
    const dialogComponent: MyDialogComponent = this.modalRef.componentInstance;
    
    dialogComponent.setDialog(dialog);

    dialogComponent.dismiss = () => {
      this.modalRef?.dismiss();
    }
  }

  openDialogSave( MyDialogSaveComponent: any, dialog : MyDialog): Subject<MyDialog> {
    
    this.openDialog(  MyDialogSaveComponent, dialog );
    const dialogComponent: MyDialogSaveComponent = this.modalRef?.componentInstance;
    const saveRequest = new Subject<MyDialog>();
    this.saveResponse = new Subject<MyDialogError>()
   
    dialogComponent.close = () => {
      saveRequest.next(dialog);
    }
    
    this.saveResponse.subscribe( {
      next : (dialogError: MyDialogError) => {
        dialogComponent.setError(dialogError)
        console.log("Error", dialogError);
      },
      complete : () => { this.modalRef?.close() }
    })
  
    return saveRequest;
  }


  sendError(dialogError: MyDialogError) {
    this.saveResponse.next(dialogError);
  }

  confirmClosing() {
    this.saveResponse.complete();
  }

}