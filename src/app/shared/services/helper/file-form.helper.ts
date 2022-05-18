import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CreateFolderComponent } from "../../components/file/forms/create-folder.component";
import { MoveOptionFileComponent } from "../../components/file/forms/move-option.component";
import { RenameFileComponent } from "../../components/file/forms/rename-file.component";
import { MyMoveOptionFileForm } from "../../models/form/my-file-form";
import { MyForm, MySingleExistForm, MySubmitForm } from "../../models/form/my-form";
import { DialogListener } from "../dialog.listener";

@Injectable()
export class FileFormHelper {

  constructor( private dialogListener: DialogListener  ) {  }
  
  openDialog$(FormComponent: any, model?: MyForm) {
    this.dialogListener.open( FormComponent );
    const formListener = this.dialogListener.getComponent().formListener;
    if (model) formListener.setModel(model)
    return formListener.getModel$();
  }

  renameFile$(model: MySingleExistForm) : Subject<MySingleExistForm> {
    return this.openDialog$(RenameFileComponent, model);
  }

  createFolder$(model: MySingleExistForm) : Subject<MySingleExistForm>  {
    return this.openDialog$(CreateFolderComponent, model);
  }

  moveOptionFile$(): Subject<MyMoveOptionFileForm>  {
    return this.openDialog$(MoveOptionFileComponent)
  }

}
