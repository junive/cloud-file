import { Component } from "@angular/core";
import { DialogService } from "../../services/dialog.service";

@Component({
  selector: "my-dialog-header",
  template: ` 
    <div class="modal-header">
      <h5 class="modal-title">
        <ng-content></ng-content>
      </h5>
      <button type="button" 
        class="btn-close" 
        aria-label="Close"
        (click)="dismiss()">
      </button>
    </div>`,
  styleUrls: ['../../../../assets/scss/shared/dialog.css']
})

export class DialogHeaderComponent {

  constructor(private dialogService: DialogService) {}

  dismiss() {
    this.dialogService.dismiss();
  }
}