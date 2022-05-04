import { Injectable } from "@angular/core";
import { MyFile } from "./model/my-file";

@Injectable()
export class FileHelper {

  constructor( ) { }

/*

  filterFiles(ids: string[], files: MyFile[]) {
    return files.filter( file => 
      ids.find(id => id === file.id)
    );
  }
*/
  /* getNavPath(navPath: MyFolder[], folderId: string) {
    let newNav : MyFolder[] = [];
    for (let nav of navPath) {
      newNav.push(nav);
      if (folderId == nav.id) break;
    }
    return newNav;
  } */
  
  hasName(fileName: string, files: MyFile[]) {
    return files.some(file => file.name == fileName  );
  }

  hasTwin(files1: MyFile[], files2: MyFile[]) {
    return files2.some( file2 => 
      this.hasName(file2.name, files1)
    )
  }

  filterTwins(files1: MyFile[], files2: MyFile[]) {
    return files2.filter( file2 => 
      this.hasName(file2.name, files1)
    )
  }
  
  getMoveQ(files1: MyFile[], targetId:string, files2?: MyFile[]) {
    const queries: any[] = [];
    for(const file of files1) {
      const query : any = {};
      if (files2) {
        let name = file.name;
        let safety = 0;
        while (this.hasName(name, files2) && safety < 100) {
          name = this.updateName(name);
          safety++
        }
        if (safety >= 100) throw new Error("Custom : An error occured replacing files");
        if (safety > 0) query.name = name;
      }
      query.fileId = file.id;
      query.parentId = file.parentId;
      query.targetId = targetId;
      queries.push(query);
    }
    return queries;
  }

  updateName(name: string) {
    var match = name.match(/^(.+-copy-)(\d+)$/);
    return match && match[2] !== '3'
        ? match[1] + (+match[2] + 1)
        : name + '-copy-1';
  }
}