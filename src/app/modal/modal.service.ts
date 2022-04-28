import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { DialogInputComponent } from "./dialog-input/dialog-input.component";
import { MyModal, MyDialogInput, MyDialogSelect} from "./_model/my-modal";
import { MyDialogComponent, MyDialogInputComponent, MyModalComponent } from "./_model/my-modal-component";
import { MyDialogError } from "./_model/my-dialog-error";
import { DialogSelectComponent } from "./dialog-select/dialog-select.component";

@Injectable()
export class ModalService {

  saveResponse: Subject<MyDialogError> = new Subject<MyDialogError>();
  modalRef?: NgbModalRef;

  constructor( private modalService: NgbModal ) {  }

  ngOnInit() { }
  
  openModal( ModalComponent: any, modal : MyModal) : void {
    this.modalRef = this.modalService.open(
      ModalComponent, { centered: true }
    );
    const modalComponent: MyModalComponent = this.modalRef.componentInstance; 
    modalComponent.setModal(modal);
    modalComponent.dismiss = () => {
      this.modalRef?.dismiss();
    }
  }

  openDialog( DialogComponent: any, dialog : MyModal): Subject<MyModal> {
    this.openModal( DialogComponent, dialog );
    const dialogComponent: MyDialogComponent = this.modalRef?.componentInstance;
    const request = new Subject<MyModal>();
   
    dialogComponent.close = () => {
      request.next(dialog);
    }
  
    return request;
  }

  openDialogInput(dialog : MyDialogInput) : Subject<MyDialogInput> {
    const request = this.openDialog(DialogInputComponent, dialog);
    const dialogComponent: MyDialogInputComponent = this.modalRef?.componentInstance;
    this.saveResponse = new Subject<MyDialogError>()
    
    this.saveResponse.subscribe( {
      next : (dialogError: MyDialogError) => {
        dialogComponent.setError(dialogError);
      }
      //,complete : () => { this.modalRef?.close() }
    })
    return request;
  }

  openDialogSelect(dialog : MyDialogSelect): Subject<MyDialogSelect> {
    return this.openDialog(DialogSelectComponent, dialog);
  }

  sendInputError(dialogError: MyDialogError) {
    this.saveResponse.next(dialogError);
  }

  confirmClosing() {
    this.saveResponse.complete();
    this.modalRef?.close();
  }

}