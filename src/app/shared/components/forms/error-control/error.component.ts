import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ElementPositionPipe } from 'src/app/shared/pipes/element-position';

@Component({
  selector:"my-error-control",
  templateUrl:"./error-control.html",
  //styleUrls: ['../../../../../assets/scss/dialog.css']
})
export class ErrorControlComponent {
  @Input() control: FormControl = new FormControl();  
  @Input() input!: HTMLElement;
  style: string | null = "";

  constructor(private positionPipe: ElementPositionPipe) { }

  ngOnInit() { 
    this.control.statusChanges.subscribe(changes => {
      if (this.control.pending || this.control.valid) return;
      this.style = this.positionPipe.transform(this.input, {
        h:1, top:10, position:'absolute'
      })
    })

   }



}

