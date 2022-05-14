import { Injectable } from "@angular/core";
import { MyFile } from "../../../shared/models/file/my-file";
import { MyFilesMoveQuery, MyFileUpdateQuery } from "../../../shared/models/file/my-file-query";

@Injectable()
export class FileQueryHelper {


  constructor( ) { }
 
  hasName(fileName: string, files: MyFile[]) {
    return files.some(file => file.name == fileName  );
  }

  hasTwin(move:MyFilesMoveQuery) : boolean {
    return move.targets ? move.targets.some( file => 
      this.hasName(file.name, move.files) 
    ) : false
  }

  filterTwinsId(move: MyFilesMoveQuery): string[] {
    return move.targets ? move.targets!.filter( file =>
      this.hasName(file.name, move.files)
    ).map(file => file.id) : []
  }

  getMoveQueries(move: MyFilesMoveQuery, rename?: boolean) {
    const queries: MyFileUpdateQuery[] = [];
    for (const file of move.files) {
      const query : MyFileUpdateQuery = {id: file.id};
      if (rename && move.targets) {
        let name = file.name;
        let safety = 0;
        while (this.hasName(name, move.targets) && safety < 100) {
          name = this.updateName(name);
          safety++
        }
        if (safety >= 100) throw new Error("Custom : An error occured replacing files");
        if (safety > 0) query.name = name;
      }
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