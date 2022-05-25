import { Directive, Inject, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn,  NG_ASYNC_VALIDATORS,  ValidationErrors } from '@angular/forms';
import { distinctUntilChanged, map, Observable, of, switchMap, take, timer } from 'rxjs';
import { Controller } from '../../core/controllers/abstract/controller';
import { MyValueExistValidator } from '../models/my-validator';
import { MyData } from '../models/my-data';

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

/*
  @Input() set nameExist(name : {query: any, value?: string}) {
    this.model = <MyValueExistValidator> { 
      key:"name", query: <MyGetListQuery> name.query, value: name.value
    } ;
  }*/

  constructor( @Inject(Controller) private controller: Controller) { }

  // Use for directive template
  validate(control: AbstractControl):  Observable<ValidationErrors | null> {
    return this.valid$(this.model, control);
  }

  // Use for reactiveForms
  validator( model: MyValueExistValidator): AsyncValidatorFn  {
    return (control: AbstractControl) : Observable<ValidationErrors | null>  => {
      return this.valid$(model, control);
    }
  }

  valid$( model: MyValueExistValidator, control: AbstractControl) {
    if ( !model.key || !control.value) return of(null);
    return timer(100).pipe(
      switchMap( () => this.controller.getList$(model.query ?? {} ) ),
      //debounceTime(200),
      distinctUntilChanged(),
      take(1),
      map( (datas: MyData[]) => { // Ex : MyFile
        const obj : any = {}
        obj[model.key+"Exist"] = true; // Ex : { nameExist : true }
        const exist = datas.some( (data:MyData) => 
          // Need to cast string key for "any" reason...
          control.value != model.value &&
          data[<keyof typeof data> model.key] == control.value
        );
        return exist ? obj : null;
      }),
    )
  }
}

