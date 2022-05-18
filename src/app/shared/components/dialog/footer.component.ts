import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { DialogListener } from "../../services/dialog.listener";
import { FormListener } from "../../services/form.listener";

@Component({
  selector: "my-dialog-footer",
  template: ` <div class="modal-footer">
                <button type="button"  
                  class="btn btn-secondary"   
                  (click)="dismiss()">Close</button>
                <ng-content></ng-content>
                <button type="button"
                  class="btn btn-primary" 
                  [disabled]="!valid"
                  (click)="save();">Save changes
                </button>
              </div>`,
  styleUrls: ['../../../../assets/scss/dialog.css']
})
export class DialogFooterComponent {
  //@Input() submit$!: BehaviorSubject<MySubmitForm>;
  valid: boolean = false;
  @Input() disableSave = false;
  @Output() closeEvent = new EventEmitter<void>();

  constructor(private dialogListen: DialogListener,
              private formListen: FormListener) {}

  @HostListener('document:keydown.enter', ['$event']) 
  onEnterHandler(event: KeyboardEvent) {
    this.save();
  } 

  ngOnInit() {
    this.formListen.submit$.subscribe(submit => {
      this.valid = submit.valid!;
    })
  }

  dismiss() {
    this.dialogListen.dismiss()
  }

  save() {
    //this.closeEvent.emit();
    //const isValid = this.formService.submit$.getValue().valid;
    if (!this.valid) return;
    this.formListen.submit$.next( { save:true} );
    this.dialogListen.close();
  }
}