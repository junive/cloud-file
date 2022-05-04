import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { distinctUntilChanged, map, Observable, of, switchMap, take, timer } from "rxjs";
import { MyFile } from "../file/model/my-file";
import { MyFileController } from "../file/model/my-file-controller";

export class DialogValidator {
  
  constructor(public controller: MyFileController ) {  }

  checkFileNames() : AsyncValidatorFn  {
    const q = {driveId:this.controller.currentId}
    return (control: AbstractControl) : Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      return timer(100).pipe(
        switchMap(() => this.controller.getFiles$(q)),
        //debounceTime(200),
        distinctUntilChanged(),
        take(1),
        map( (files: MyFile[]) => {
          const exist = files.some(file => file.name == control.value);
          return exist ? { fileExist: true } : null;
        }),
      )
    }
  }
}