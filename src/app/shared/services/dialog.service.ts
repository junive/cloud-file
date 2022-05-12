import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { MyDialog, MyDialogEnum, MyNamingDialog, MySelectingDialog} from "../models/dialog/my-dialog";
import { MyDialogComponent } from "../models/dialog/my-dialog-component";
import { NamingDialogComponent } from "src/app/shared/components/dialog/naming/naming.component";
import { SelectingDialogComponent } from "src/app/shared/components/dialog/selecting/selecting.component";

@Injectable()
export class DialogService {

  //inputResponse$: Subject<MyDialogError> = new Subject<MyDialogError>();
  modalRef?: NgbModalRef;
  
  constructor( 
    private modalService: NgbModal 
  ) {  }

  ngOnInit() { }
  
  closeModal() {
    this.modalRef!.close();
  }

  getComponent() {
    return this.modalRef!.componentInstance;
  }

  openModal( ModalComponent: any, modal : MyDialog) : void {
    this.modalRef = this.modalService.open(
      ModalComponent, { centered: true }
    );
    const component: MyDialogComponent = this.modalRef.componentInstance; 
    component.setDialog(modal);
    
    component.dismiss = () => {
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
/*
  openNaming$(dialog : MyDialogNaming){
    return this.openDialog$(DialogNamingComponent, dialog);
  }
*/
 


}
