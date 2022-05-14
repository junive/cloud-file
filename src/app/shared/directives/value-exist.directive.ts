import { AbstractControl, AsyncValidatorFn,  ValidationErrors } from '@angular/forms';
import { distinctUntilChanged, map, Observable, of, switchMap, take, timer } from 'rxjs';
import { MyData, MyController } from '../models/http/my-controller';
import { MyGetListQuery } from '../models/http/my-query';


export class ValueExistDirective {
  
  static valid( key:string, controller: MyController, 
    query: MyGetListQuery) : AsyncValidatorFn  {
   // const valids: AsyncValidatorFn[] = [];
    //directives.forEach(d => {
      //valids.push(
        return (control: AbstractControl) : Observable<ValidationErrors | null> => {
        if (!control.value) return of(null);
        return timer(100).pipe(
          switchMap( () =>  controller.getList$(query) ),
          //debounceTime(200),
          distinctUntilChanged(),
          take(1),
          map( (datas: MyData[]) => { // Ex : MyFile
            const obj : any = {}
            obj[key+"Exist"] = true; // Ex : { nameExist : true }
            const exist = datas.some( (data:MyData) => 
              // Need to cast string key for "any" reason...
              data[<keyof typeof data> key] == control.value);
            return exist ? obj : null;
          }),
        )
      }
      //)
     
   // })
   // return valids;
  }
  


}
