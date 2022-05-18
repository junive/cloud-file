import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DialogListener } from "../../services/dialog.listener";

@Component({
  selector: "my-dialog-header",
  template: ` <div class="modal-header">
                <h5 class="modal-title">
                  <ng-content></ng-content>
                </h5>
                <button type="button" 
                  class="btn-close" 
                  aria-label="Close"
                  (click)="dismiss()">
                </button>
              </div>`,
  styleUrls: ['../../../../assets/scss/dialog.css']
})

export class DialogHeaderComponent {

  constructor(private service: DialogListener) {}

  dismiss() {
    this.service.dismiss();
  }
}