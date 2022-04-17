import { Component, HostListener, Input } from '@angular/core';
import { MySimpleDialog } from 'src/app/_model/my-simple-dialog';
import { DialogEnum, DialogErrorEnum } from '../helper/dialog-enum';

@Component({
  selector: "rename-modal",
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css'],
})

export class SimpleDialogComponent  {
  
  @Input() dialogReact!: MySimpleDialog;
  public dialogEnum = DialogEnum;
  public dialogErrorEnum = DialogErrorEnum;
  public username:string ="";


  constructor() { }

  ngAfterViewInit() { }

  @HostListener('document:keydown.escape', ['$event']) 
  onEscapeHandler(event: KeyboardEvent) {
    return this.dismiss();
  }

  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    return this.close();
  }

  async close(): Promise<void> {
   // if (this.dialogReact.error) return;
    this.dialogReact.callback!.closeDialog();
    //this.dialogReact.ref!.close(this.dialogReact)
  }

  async dismiss(): Promise<void> {
    this.dialogReact.callback!.dismissDialog();
    //this.dialogReact.ref!.dismiss(this.dialogReact)
  }
}