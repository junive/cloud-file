import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "my-dialog-header",
  template: ` <div class="modal-header">
                <h5 class="modal-title">{{title}}</h5>
                <button type="button" 
                  class="btn-close" 
                  aria-label="Close"
                  (click)="dismiss()">
                </button>
              </div>`,
  styleUrls: ['../dialog.css']
})
export class DialogHeaderComponent {
  @Input() title: string = "No Title";
  @Output() dismissEvent = new EventEmitter<void>();

  constructor() {}

  dismiss() {
    this.dismissEvent.emit();
  }
}