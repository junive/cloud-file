import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of, Subject } from "rxjs";
import { DialogInputComponent } from "./dialog-input/dialog-input.component";
import { MyModal, MyDialogInput, MyDialogSelect} from "./_model/my-modal";
import { MyDialogComponent, MyModalComponent } from "./_model/my-modal-component";
import { DialogSelectComponent } from "./dialog-select/dialog-select.component";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";

@Injectable()
export class ModalService {

  //inputResponse$: Subject<MyDialogError> = new Subject<MyDialogError>();
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

  openDialog$( DialogComponent: any, dialog : MyModal): Subject<void> {
    this.openModal( DialogComponent, dialog );
    const request$ = new Subject<void>();
    const component: MyDialogComponent = this.getComponent()
   
    component.close = () => {
      this.modalRef?.close();
      request$.next(void 0);
    }
  
    return request$;
  }

  openDialogInput$(dialog : MyDialogInput) : any{
    return this.openDialog$(DialogInputComponent, dialog);
  }

  openDialogSelect$(dialog : MyDialogSelect): Subject<void> {
    return this.openDialog$(DialogSelectComponent, dialog);
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