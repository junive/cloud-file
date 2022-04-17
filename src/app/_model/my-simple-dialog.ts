import { EventEmitter } from '@angular/core';
import { DialogEnum, DialogErrorEnum } from '../dialog/helper/dialog-enum';
import { MyDialog } from './my-dialog';
import { MyFile } from './my-file';

export interface MySimpleDialog {
    callback?: any
    event?: EventEmitter<MySimpleDialog> 
    name?: string
    title?: string
    enum? : DialogEnum
    file?: MyFile
    error?: DialogErrorEnum
}