import { Component, HostListener } from "@angular/core";
import { DialogService } from "../../services/dialog.service";
import { FormService } from "../../services/form.service";

@Component({
  selector: "my-dialog-footer",
  template: ` 
    <div class="modal-footer">
      <button type="button"  
        class="btn btn-secondary"   
        (click)="dismiss()">Close</button>
      <ng-content></ng-content>
      <button type="button"
        class="btn btn-primary" 
        [disabled]="!formService.form.valid"
        (click)="save();">Save changes
      </button>
    </div>`,
  styleUrls: ['../../../../assets/scss/shared/dialog.css']
})
export class DialogFooterComponent {

  constructor(private dialogService: DialogService,
              public formService: FormService) { }

  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    this.save();
  } 

  ngOnInit() { }

  dismiss() {
    this.dialogService.dismiss()
  }

  save() {
    if (!this.formService.form.valid) return;
    this.formService.save();
    this.dialogService.close();
  }
}