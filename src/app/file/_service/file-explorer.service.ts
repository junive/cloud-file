import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DialogInputComponent } from "src/app/modal/dialog-input/dialog-input.component";
import { ModalService } from "src/app/modal/modal.service";
import { MyDialogInput, MyDialogSelect } from "src/app/modal/_model/my-modal";
import { MyFile, MyFolder } from "../_model/my-file";

@Injectable()
export class FileExplorerService {

  files: MyFile[] = []

  constructor( public modalService: ModalService ) { }


  closeDialogSimple(name:string): boolean {
    if (!name || name == "") {
      this.modalService.sendInputError({
        message: "Please Provide a name"
      })
      return false;
    }
    if (this.hasSameName(name)) {
      this.modalService.sendInputError({
        message: "File/Folder already exist !"
      })
      return false;
    } 
    this.modalService.confirmClosing();
    return true;
  }

  /*
  compareNames(filesComp: MyFile[]) {
    let  hasDuplicateName = false;
    for (const file of filesComp) {
      if (this.hasSameName(file.name)) {
        hasDuplicateName = true;
        break;
      }
    }
    console.log(hasDuplicateName)
    return hasDuplicateName;
  }
  */
  
  getIdsByDuplicateName(filesTarget: MyFile[]) {
    return filesTarget.filter(
    fileTarget => this.files.find(
      file => file.name === fileTarget.name
    )).map( file=> file.id);
  }

  getFile(fileId: string) {
    return this.files.find( file => file.id == fileId  )
  }

  getNavPath(navPath: MyFolder[], folderId: string) {
    let newNav : MyFolder[] = [];
    for (let nav of navPath) {
      newNav.push(nav);
      if (folderId == nav.id) break;
    }
    return newNav;
  }
  
  hasSameName(fileName: string, filesTarget?: MyFile[]) {
    const files = filesTarget ? filesTarget :  this.files;
    return files.some(file => file.name == fileName  );
  }
  
  openDialogSimple(dialog: MyDialogInput, callBack: any) {
    //const name = (dialog.id) ? this.getFile(dialog.id)!.name : "";
    this.modalService.openDialogInput(dialog)
      .subscribe( (response : MyDialogInput) => {
        if (this.closeDialogSimple(response.name!)) {
          callBack(response);
        } 
      }); 
  }

  openDialogSelect(dialog: MyDialogSelect, callBack: any) {
    this.modalService.openDialogSelect(dialog)
      .subscribe( (response : MyDialogSelect) => {
        callBack(response);
        this.modalService.confirmClosing();
      }); 
  }

  renameFiles(filesTarget: MyFile[]) {
    this.files.forEach(file => {
      let stop = 0;
      while (this.hasSameName(file.name, filesTarget) && stop < 100) {
        file.name = this.updateName(file.name);
        stop++
      }
    })
  }

  setFiles(files: MyFile[]) {
    this.files = files
  }

  updateName(name: string) {
    var match = name.match(/^(.+-copy-)(\d+)$/);
    return match && match[2] !== '3'
        ? match[1] + (+match[2] + 1)
        : name + '-copy-1';
  }
}