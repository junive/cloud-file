import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { MyForm } from "../models/abstract/my-form";

@Injectable()
export class DialogListener {

  modalRef?: NgbModalRef;
  
  constructor( private modalService: NgbModal ) {  }

  ngOnInit() { }
  
  close() {
    this.modalRef!.close();
  }

  dismiss() {
    this.modalRef!.dismiss();
  }

  getComponent() {
    return this.modalRef!.componentInstance;
  }

  open( ModalComponent: any, model? : MyForm) : void {
    this.modalRef = this.modalService.open(
      ModalComponent, { centered: true }
    );
  }

}
