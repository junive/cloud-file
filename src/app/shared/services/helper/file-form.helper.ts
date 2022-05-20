import { Inject, Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { CreateFolderComponent } from "../../components/file/forms/create-folder.component";
import { MoveOptionFileComponent } from "../../components/file/forms/move-option.component";
import { RenameFileComponent } from "../../components/file/forms/rename-file.component";
import { ValueExistDirective } from "../../directives/value-exist.directive";
import { FormListener } from "../../listeners/form.listener";
import { MyForm, MyRadioControl, MyRadioValue, MyTextControl } from "../../models/abstract/my-form";
import { MyMovingFileForm, MyNamingFileForm } from "../../models/file/my-file-form";
import { DialogListener } from "../dialog.listener";

@Injectable()
export class FileFormHelper {

  constructor(private listener: FormListener,
              private dialogService: DialogListener,
              private existDirective: ValueExistDirective ) { }
  

  getNamingModel(driveId: string, name?: string) {
    return <MyNamingFileForm> { 
      naming : {
        value: name,
        asyncs : [  
          this.existDirective.validator({
            key: 'name',
            value: name ?? "",
            query: <any> { driveId: driveId }
          })
        ],
        validators : [Validators.required]
      }
    }
  }

  openDialog$(FormComponent: any, model?: MyForm) : any {
    this.listener.init(model);
    this.dialogService.open( FormComponent );
    return this.listener.model$;
  }

  renameFile$(driveId: string, name: string) : Subject<MyNamingFileForm> {
    const model = this.getNamingModel(driveId, name);
    return this.openDialog$(RenameFileComponent, model);
  }

  createFolder$(driveId: string) : Subject<MyNamingFileForm>  {
    const model = this.getNamingModel(driveId);
    return this.openDialog$(CreateFolderComponent, model);
  }

  moveOptionFile$(): Subject<MyMovingFileForm>  {
    const model = <MyMovingFileForm> { moving : {value: MyRadioValue.KEEP}}
    return this.openDialog$(MoveOptionFileComponent, model)
  }

}
