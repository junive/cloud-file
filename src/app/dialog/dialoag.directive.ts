import { Directive, ViewContainerRef } from '@angular/core';
 
@Directive({
  selector: '[my-dialog]'
})

export class DialogDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}