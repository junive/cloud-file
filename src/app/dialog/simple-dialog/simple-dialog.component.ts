import { Component, ElementRef, HostListener, Injectable, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { MySimpleDialog } from 'src/app/_model/my-simple-dialog';
import { DialogManagerService } from 'src/app/_service/dialog.service';
import { DialogEnum, DialogErrorEnum } from '../../_helper/dialog-enum';

@Component({
  selector: "my-simple-dialog",
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css']
})

export class SimpleDialogComponent  {
  dialogReact: MySimpleDialog = {};
  dialogEnum = DialogEnum;
  dialogErrorEnum = DialogErrorEnum;
  
  modalRef?: NgbModalRef;

  constructor(
    private dialogService: DialogManagerService,
    private template: ElementRef
  ) { }

  ngAfterViewInit() { }

  getTemplate() {
    //This will return '<p> Text </p>' as a string
    return this.template;
  }

  @HostListener('document:keydown.escape', ['$event']) 
  onEscapeHandler(event: KeyboardEvent) {
    return this.dismiss();
  }

  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    return this.close();
  }

  open(di: MySimpleDialog) {
    this.dialogReact = di;
   /* this.modalRef = this.modalService.open(
     this.app.getSimpleDialog(),
      {centered:true}
    );
    this.modalRef.shown.subscribe({
      next: () => { // Autofocus bug
        const childNode = document.querySelector('.inputTextSimpleDialog');
        const childElem = (childNode) ? childNode as HTMLElement : undefined;
        if (childElem) childElem.focus();
      }
    });
    */
  // console.log(this);
  }

  close() {
    this.dialogService.close();
   // if (this.dialogReact.error) return;
  // if (this.dialog.error != undefined) return;

    //this.modalRef!.close();
    //this.dialogReact.callback!.closeDialog();
    //this.dialogReact.ref!.close(this.dialogReact)
  }

  dismiss() {
    this.dialogService.dismiss();
   // console.log(this.modalRef)
    //this.modalRef!.dismiss();
    //this.dialogReact.callback!.dismissDialog();
    //this.dialogReact.ref!.dismiss(this.dialogReact)
  }
}