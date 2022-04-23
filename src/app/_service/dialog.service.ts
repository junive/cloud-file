import { HostListener, Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { SimpleDialogComponent } from "../dialog/simple-dialog/simple-dialog.component";

@Injectable()
export class DialogManagerService{
  
  modalRef?: NgbModalRef;

  constructor(
      private modalService: NgbModal,
     // private dialogSimple: SimpleDialogComponent
    ) {
  }

  
  @HostListener('document:keydown.escape', ['$event']) 
  onEscapeHandler(event: KeyboardEvent) {
    return this.dismiss();
  }


  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    return this.close();
  }

  openSimpleDialog() {
   // console.log(this.dialogSimple.getTemplate())
    this.modalRef = this.modalService.open(
      SimpleDialogComponent,
       {centered:true}
     );
     
  }

  close() {
    throw new Error('Method not implemented.');
  }
 
  dismiss() {
    this.modalRef!.dismiss();
  }

}