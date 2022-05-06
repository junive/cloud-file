import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "my-dialog-footer",
  template: ` <div class="modal-footer">
                <button type="button"  
                  class="btn btn-secondary"   
                  (click)="dismiss()">Close</button>
                <button type="button"
                  class="btn btn-primary" 
                  [disabled]="disableSave"
                  (click)="save();">Save changes</button>
              </div>`,
  styleUrls: ['../dialog.css']
})
export class DialogFooterComponent {
  @Input() hideSave = false;
  @Input() disableSave = false;
  @Output() dismissEvent = new EventEmitter<void>();
  @Output() closeEvent = new EventEmitter<void>();

  constructor() {}

  dismiss() {
    this.dismissEvent.emit();
  }

  save() {
    this.closeEvent.emit();
  }
}