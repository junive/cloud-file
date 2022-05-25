import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { CreateFolderComponent } from "../components/forms/create-folder.component";
import { MoveOptionFileComponent } from "../components/forms/move-option.component";
import { RenameFileComponent } from "../components/forms/rename-file.component";
import { ValueExistDirective } from "../../shared/directives/value-exist.directive";
import { FormService } from "../../shared/services/form.service";
import { MyForm, MyRadioValue } from "../../shared/models/my-form";
import { MyMovingFileForm, MyNamingFileForm } from "../models/my-file-form";
import { DialogService } from "../../shared/services/dialog.service";

@Injectable()
export class FileFormService {

  constructor(private formService: FormService,
              private dialogService: DialogService,
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

  openDialog$(FormFileComponent: any, model?: MyForm) : any {
    this.formService.init(model);
    this.dialogService.open( FormFileComponent );
    return this.formService.model$;
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
