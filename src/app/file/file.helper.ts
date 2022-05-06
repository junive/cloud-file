import { Injectable } from "@angular/core";
import { MyFile, MyFilesMove } from "./model/my-file";
import { MyFileUpdateQuery } from "./model/my-file-service";

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

  hasTwin(move:MyFilesMove) {
    return move.targets.some( file => 
      this.hasName(file.name, move.files)
    )
  }

  filterTwinsId(move: MyFilesMove) {
    return move.targets.filter( file =>
      this.hasName(file.name, move.files)
    ).map(file => file.id);
  }
  

  getMoveQueries(move: MyFilesMove, rename?: boolean) {
    const queries: any[] = [];
    for (const file of move.files) {
      const query : any = {};
      if (rename) {
        let name = file.name;
        let safety = 0;
        while (this.hasName(name, move.targets) && safety < 100) {
          name = this.updateName(name);
          safety++
        }
        if (safety >= 100) throw new Error("Custom : An error occured replacing files");
        if (safety > 0) query.name = name;
      }
      query.fileId = file.id;
      query.parentId = file.parentId;
      query.targetId = move.targetId;
      queries.push(query);
    }
    return <MyFileUpdateQuery[]> queries;
  }

  updateName(name: string) {
    var match = name.match(/^(.+-copy-)(\d+)$/);
    return match && match[2] !== '3'
        ? match[1] + (+match[2] + 1)
        : name + '-copy-1';
  }
}