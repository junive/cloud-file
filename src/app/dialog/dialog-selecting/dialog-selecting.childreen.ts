import { Component } from "@angular/core";
import { MyDialogEnum, MyDialogSelecting } from "../model/my-dialog";
import { DialogSelectingComponent } from "./dialog-selecting.component";

@Component({
  templateUrl: './dialog-selecting.html',
  styleUrls: ['../dialog.css']
})
export class DialogSelectingMoveComponent extends DialogSelectingComponent {
  
  ngOnInit() {
    this.title = "Import Options",
    this.subtitle = "One or more elements already exist",
    this.selections.set(MyDialogEnum.REPLACE, "Replace Existing files");
    this.selections.set(MyDialogEnum.KEEP, "Keep all files");
  }

  override setDialog(dialog: MyDialogSelecting) {
    super.setDialog(dialog);
    dialog.selected = MyDialogEnum.REPLACE;
  }
}