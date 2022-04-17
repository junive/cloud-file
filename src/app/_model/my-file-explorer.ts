import { EventEmitter } from "@angular/core";
import { MySimpleDialog } from "./my-simple-dialog";

export interface MyFileExplorer {
    renameFileEvent: EventEmitter<MySimpleDialog>;
    addFolderEvent: EventEmitter<MySimpleDialog>;
  }