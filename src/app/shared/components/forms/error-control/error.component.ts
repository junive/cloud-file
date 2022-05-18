import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector:"my-error-control",
  templateUrl:"./error-control.html",
  //styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class ErrorControlComponent {
  @Input() control: FormControl = new FormControl();  
  @Input() validForm: boolean = true;
  constructor( ) {   }

  ngOnInit() {  }

}

