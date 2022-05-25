import { Pipe } from "@angular/core";

@Pipe({name: 'elementPosition', pure: false})
export class ElementPositionPipe {

  // Poisition must be absolute in case scrolling
  transform(elem: HTMLElement | MouseEvent , pos: {
            w?: number, h?: number, top?:number, left?:number, 
            pure?: boolean, position?:string}): string | null {
      
    if (!elem || pos.pure) return null;
    if (!pos.position) pos.position = 'fixed';

    let left = (pos.left ?? 0);
    let top =  (pos.top ?? 0);
    let width = (pos.w ?? 0);
    let height = (pos.h ?? 0);

    if (elem instanceof HTMLElement) {
      const rect = elem.getBoundingClientRect();
      const abs =  (pos.position == "absolute");
      left = left + ((abs) ? elem.offsetLeft : rect.left) ;
      top = top + ((abs) ? elem.offsetTop : rect.top);
      width = width * rect.width;
      height = height * rect.height;
    } 
    if (elem instanceof MouseEvent) {
      left = left + elem.pageX;
      top = top + elem.pageY;
    }

   // console.log(pos.pure, pos.top);
    return "left:" + (left + width) + "px;" +
           "top:" + (top + height) + "px;" +
           "position:"+pos.position+"; z-index:10;"
  }

}