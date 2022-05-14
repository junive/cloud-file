import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { SelectingDialogComponent } from "../../../shared/components/dialog/selecting/selecting.component";
import { ValueExistDirective } from "../../../shared/directives/value-exist.directive";
import { MyFileGetListQuery } from "../../../shared/models/file/my-file-query";
import { NamingDialogComponent } from "../../../shared/components/dialog/naming/naming.component";
import { MyDialogEnum, MyNamingDialog, MySelectingDialog } from "../../../shared/models/dialog/my-dialog";
import { DialogService } from "../../../shared/services/dialog.service";
import { MyFileController } from "../../models/file/my-file-controller";

@Injectable()
export class FileDialogHelper {

  constructor(private dialogService: DialogService ) { }

  getNamingDialog( controller: MyFileController, driveId: string, name?: string) {
    return <MyNamingDialog> {
      name: name,
      validators : [Validators.required],
      asynchValidators: [  ValueExistDirective.valid(
         "name", controller,  <MyFileGetListQuery> { driveId: driveId }
      )]
    } 
  }

  openCreateFolder$(dialog: MyNamingDialog) {
    const request$ = this.dialogService.openDialog$(NamingDialogComponent, dialog);
    this.dialogService.getComponent().title = "Create new Folder"
    return request$;
  }

  openRenameFile$(dialog: MyNamingDialog) {
    const request$ = this.dialogService.openDialog$(NamingDialogComponent, dialog);
    this.dialogService.getComponent().title = "Rename File"
    return request$;
  }
/*
  openSelecting$(dialog : MyDialogSelecting) {
    return this.openDialog$(DialogSelectingComponent, dialog);
  }*/

  openSelectingMove$(dialog: MySelectingDialog) {
    dialog.selected = MyDialogEnum.REPLACE;
    const request$= this.dialogService.openDialog$(SelectingDialogComponent,  dialog);
    const component =  this.dialogService.getComponent();
    component.title = "Import Options",
    component.subtitle = "One or more elements already exist",
    component.selections.set(MyDialogEnum.REPLACE, "Replace Existing files");
    component.selections.set(MyDialogEnum.KEEP, "Keep all files");
    return request$;
  }


}