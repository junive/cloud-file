import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn,  NG_ASYNC_VALIDATORS,  ValidationErrors } from '@angular/forms';
import { distinctUntilChanged, map, Observable, of, switchMap, take, timer } from 'rxjs';
import { Controller } from 'src/app/core/abstract/controller';
import { MyValueExistValidator } from '../models/form/my-input';
import { MyData } from '../models/http/my-controller';
import { MyGetListQuery } from '../models/http/my-query';

/*
export interface MyValueExist {
  key: string;
  query?: MyGetListQuery;
}*/

@Directive({
  selector: '[valueExist], [nameExist]',
    providers: [{
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValueExistDirective, 
      multi: true
    }]
})
export class ValueExistDirective implements AsyncValidator{
  model!: MyValueExistValidator;

  @Input() set valueExist(model: MyValueExistValidator) {
    this.model = model;
  }

  @Input() set nameExist(query: MyGetListQuery) {
    this.model = { key:"name", query: query } ;
  }

  constructor( @Inject(Controller) private controller: Controller) {
    
   }

  validate(control: AbstractControl):  Observable<ValidationErrors | null> {

    if ( !this.model.key || !control.value) return of(null);
    return timer(100).pipe(
      switchMap( () => this.controller.getList$(this.model.query!) ),
      //debounceTime(200),
      distinctUntilChanged(),
      take(1),
      map( (datas: MyData[]) => { // Ex : MyFile
        const obj : any = {}
        obj[this.model.key+"Exist"] = true; // Ex : { nameExist : true }
        const exist = datas.some( (data:MyData) => 
          // Need to cast string key for "any" reason...
          data[<keyof typeof data> this.model.key] == control.value);
          return exist ? obj : null;
      }),
    )
   }

}
