import { Component, HostListener } from "@angular/core";
import { DialogListener } from "../../services/dialog.listener";
import { FormListener } from "../../listeners/form.listener";

@Component({
  selector: "my-dialog-footer",
  template: ` <div class="modal-footer">
                <button type="button"  
                  class="btn btn-secondary"   
                  (click)="dismiss()">Close</button>
                <ng-content></ng-content>
                <button type="button"
                  class="btn btn-primary" 
                  [disabled]="!listen.form.valid"
                  (click)="save();">Save changes
                </button>
              </div>`,
  styleUrls: ['../../../../assets/scss/dialog.css']
})
export class DialogFooterComponent {
  //valid: boolean = false;

  constructor(private service: DialogListener,
              public listen: FormListener) {}

  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    this.save();
  } 

  ngOnInit() {
    /*
    this.listen.submit$.subscribe(submit => {
      this.valid = submit.valid!;
    })
    */
  }

  dismiss() {
    this.service.dismiss()
  }

  save() {
    if (!this.listen.form.valid) return;
    this.listen.save();
    this.service.close();
  }
}