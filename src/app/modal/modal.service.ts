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

  inputResponse$: Subject<MyDialogError> = new Subject<MyDialogError>();
  modalRef?: NgbModalRef;

  constructor( private modalService: NgbModal ) {  }

  ngOnInit() { }
  
  openModal( ModalComponent: any, modal : MyModal) : void {
    this.modalRef = this.modalService.open(
      ModalComponent, { centered: true }
    );
    const component: MyModalComponent = this.modalRef.componentInstance; 
    component!.setModal(modal);
    component!.dismiss = () => {
      this.modalRef?.dismiss();
    }
  }

  openDialog( DialogComponent: any, dialog : MyModal): Subject<MyModal> {
    this.openModal( DialogComponent, dialog );
    const request = new Subject<MyModal>();
    const component: MyDialogComponent = this.getComponent()
   
    component.close = () => {
      request.next(dialog);
    }
  
    return request;
  }

  openDialogInput(dialog : MyDialogInput) : 
    { request: Subject<MyDialogInput>, response:Subject<MyDialogError> } {
    const request = this.openDialog(DialogInputComponent, dialog);
    const component: MyDialogInputComponent = this.getComponent();
    const response = new Subject<MyDialogError>()
    
    response.subscribe( {
      next : (dialogError: MyDialogError) => {
        component.setError(dialogError);
      }
    })

    return { request : request, response: response };
  }

  openDialogSelect$(dialog : MyDialogSelect): Subject<MyDialogSelect> {
    const request = this.openDialog(DialogSelectComponent, dialog);
    const component: MyDialogComponent = this.getComponent();
   
    component.close = () => {
      this.modalRef?.close();
      request.next(dialog);
    } 

    return request;
  }

  getComponent() {
    return this.modalRef!.componentInstance;
  }

  closeModal() {
    this.modalRef!.close();
  }
/*
  sendInputError(dialogError: MyDialogError) {
    this.inputResponse$.next(dialogError);
  }

  confirmInputClosing() {
    this.modalRef!.close();
    this.inputResponse$.complete();
  }
*/
}