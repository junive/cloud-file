import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { DialogCreateFolderComponent, DialogRenameFileComponent } from "./dialog-naming/dialog-naming.childreen";
import { MyDialog, MyDialogEnum, MyDialogNaming, MyDialogSelecting} from "./model/my-dialog";
import { MyDialogComponent } from "./model/my-dialog-component";
import { DialogSelectingMoveComponent } from "./dialog-selecting/dialog-selecting.childreen";

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
  openCreateFolder$(dialog : MyDialogNaming) {
    return this.openDialog$(DialogCreateFolderComponent, <MyDialogNaming> dialog);
  }

  openRenameFile$(dialog : MyDialogNaming) {
    return this.openDialog$(DialogRenameFileComponent, <MyDialogNaming> dialog);
  }
/*
  openSelecting$(dialog : MyDialogSelecting) {
    return this.openDialog$(DialogSelectingComponent, dialog);
  }*/

  openSelectingMove$() {
    return this.openDialog$( DialogSelectingMoveComponent, {}); 
  }



}