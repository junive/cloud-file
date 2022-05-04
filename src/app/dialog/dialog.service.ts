import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { DialogNamingComponent } from "./dialog-naming/dialog-naming.component";
import { MyDialog, MyDialogNaming, MyDialogSelecting} from "./model/my-dialog";
import { MyDialogComponent } from "./model/my-dialog-component";
import { DialogSelectingComponent } from "./dialog-selecting/dialog-selecting.component";
import { MyDialogNamingType, MyDialogSelectingType } from "./model/my-dialog-type";
import { DialogValidator } from "./dialog.validator";

@Injectable()
export class DialogService {

  //inputResponse$: Subject<MyDialogError> = new Subject<MyDialogError>();
  modalRef?: NgbModalRef;

  constructor( private modalService: NgbModal ) {  }

  ngOnInit() { }
  
  openModal( ModalComponent: any, modal : MyDialog) : void {
    this.modalRef = this.modalService.open(
      ModalComponent, { centered: true }
    );
    const component: MyDialogComponent = this.modalRef.componentInstance; 
    component!.setDialog(modal);
    component!.dismiss = () => {
      this.modalRef?.dismiss();
    }
  }

  openDialog$( DialogComponent: any, dialog : MyDialog): Subject<MyDialog> {
    this.openModal( DialogComponent, dialog );
    const request$ = new Subject<MyDialog>();
    const component: MyDialogComponent = this.getComponent()
   
    component.close = () => {
      this.modalRef?.close();
      request$.next(dialog);
    }
  
    return request$;
  }

  openNaming$(dialog : MyDialogNaming){
    return this.openDialog$(DialogNamingComponent, dialog);
  }

  openRename$(dialog : any) {
    dialog.type = MyDialogNamingType.RENAME;
    return this.openNaming$(<MyDialogNaming> dialog);
  }

  openAdd$(validator: DialogValidator) {
    return this.openNaming$(<MyDialogNaming> {
      type : MyDialogNamingType.ADD,
      validator: validator
    });
  }

  openSelecting$(dialog : MyDialogSelecting) {
    return this.openDialog$(DialogSelectingComponent, dialog);
  }

  openMove$(): Subject<MyDialogSelecting> {
    return this.openSelecting$( <MyDialogSelecting> { 
        type: MyDialogSelectingType.MOVE 
    });
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