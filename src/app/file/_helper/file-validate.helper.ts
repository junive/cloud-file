import { DialogService } from "../../dialog/dialog.service";
import { MyFileList } from "./file-list.helper";

export class FileValidateHelper {

  constructor(
    public fileList: MyFileList,
    public dialogService: DialogService 
  ) { }

  dialogName(name:string): boolean {
    if (!name || name == "") {
      this.dialogService.sendError({
        message: "Please Provide a name"
      })
      return false;
    } else if (this.fileList.hasSameFile(name)) {
      this.dialogService.sendError({
        message: "File/Folder already exist !"
      })
      return false;
    } 
    this.dialogService.confirmClosing();
    return true;
  }
}