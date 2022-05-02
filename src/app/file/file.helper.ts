import { Injectable } from "@angular/core";
import { MyFile, MyFolder } from "./model/my-file";

@Injectable()
export class FileHelper {

  constructor( ) { }

  filterSameNames(files1: MyFile[], files2: MyFile[]) {
    return files2.filter( file2 => 
      files1.find( file1 => file1.name === file2.name  )
    )
  }

  filterFiles(ids: string[], files: MyFile[]) {
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