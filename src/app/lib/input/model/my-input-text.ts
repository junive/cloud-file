import { FileService } from "src/app/file/service/file.service"

export interface MyInputText{
  required?: boolean;
  file? : {
    service: FileService,
    hasTwin?: boolean 
  }
}