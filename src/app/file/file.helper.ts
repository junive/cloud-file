import { Injectable } from "@angular/core";
import { ModalService } from "src/app/modal/modal.service";
import { MyDialogInput, MyDialogSelect } from "src/app/modal/_model/my-modal";
import { MyFile, MyFolder } from "./model/my-file";

@Injectable()
export class FileHelper {

  constructor( public modalService: ModalService ) { }

/*
  closeDialogSimple(name:string, files: MyFile[]): boolean {
    if (!name || name == "") {
      this.modalService.sendInputError({
        message: "Please Provide a name"
      })
      return false;
    }
    if (this.hasSameName(name, files)) {
      this.modalService.sendInputError({
        message: "File/Folder already exist !"
      })
      return false;
    } 
    this.modalService.confirmInputClosing();
    return true;
  }
*/
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
  
  filterSameNames(files1: MyFile[], files2: MyFile[]) {
    return files2.filter( file2 => 
      files1.find( file1 => file1.name === file2.name  )
    )
  }

  filterIds(ids: string[], files: MyFile[]) {
    return files.filter( file => 
      ids.find(id => id === file.id)
    );
  }

  getNavPath(navPath: MyFolder[], folderId: string) {
    let newNav : MyFolder[] = [];
    for (let nav of navPath) {
      newNav.push(nav);
      if (folderId == nav.id) break;
    }
    return newNav;
  }
  
  hasSameName(fileName: string, files: MyFile[]) {
    return files.some(file => file.name == fileName  );
  }
  
  dialogInputRename: MyDialogInput =  {
    title: "Rename the file",
  }

  dialogInputAddFolder: MyDialogInput =  {
    title: "Add Folder",
  }


  openDialogInput(dialogInit: MyDialogInput, files: MyFile[], callback:any) {
    const dialog$ = this.modalService.openDialogInput(dialogInit);  
    dialog$.request.subscribe(dialog => {
      if (!dialog.name || dialog.name == "") {
        dialog$.response.next({
          message: "Please Provide a name"
        })
      } else if (this.hasSameName(dialog.name!, files)) {
        dialog$.response.next({
          message: "File/Folder already exist !"
        })
      } else {
        callback(dialog);
        this.modalService.closeModal();
        dialog$.request.complete();
        dialog$.response.complete();
      }
    });
    return dialog$.request;
  }
/*
  openDialogSelect(dialog: MyDialogSelect, callBack: any) {
    this.modalService.openDialogSelect(dialog)
      .subscribe( (response : MyDialogSelect) => {
        callBack(response);
        this.modalService.confirmInputClosing();
      }); 
  }
*/
  openDialogSelect$(dialog: MyDialogSelect) {
    return this.modalService.openDialogSelect$(dialog)
    
       //.pipe( map( (response : MyDialogSelect) => response ) )

    /*
      this.modalService.openDialogSelect(dialog).pipe(
      switchMap( (response : MyDialogSelect) => {
        this.modalService.confirmClosing();
        return new BehaviorSubject<MyDialogSelect>(response)
      })
    )*/
  }

  renameFiles(filesToRename: MyFile[], filesToKeep: MyFile[]) {
    filesToRename.forEach(file => {
      let stop = 0;
      while (this.hasSameName(file.name, filesToKeep) && stop < 100) {
        file.name = this.updateName(file.name);
        stop++
      }
    })
  }


  updateName(name: string) {
    var match = name.match(/^(.+-copy-)(\d+)$/);
    return match && match[2] !== '3'
        ? match[1] + (+match[2] + 1)
        : name + '-copy-1';
  }
}