import { Component, Input } from '@angular/core';
import {  FormControl} from '@angular/forms';


@Component({
  selector: 'my-input-text',
  templateUrl: './input-text.html',
  styleUrls: ['../../../../../assets/scss/input.css']
})
export class InputTextComponent{
  @Input() control: FormControl = new FormControl();
  @Input() value?: string;
  @Input() autofocus: boolean = false;

  elem: any = { error: { top: 0, left: 0 } }

  constructor(  ) { }
  
  ngOnInit(): void {  }

  positioningError(input: any) {
    //if (this.control.errors) return;
    const rect = input.getBoundingClientRect();
    this.elem.error.top = rect.bottom + 10 + 'px'; 
    this.elem.error.left = rect.left + 'px'; 
  }

}
