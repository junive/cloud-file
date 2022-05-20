import { MyCreateQuery, MyGetListQuery, MyUpdateQuery } from "../abstract/my-query";
import { MyFile } from "./my-file";

export interface MyFileCreateQuery extends MyCreateQuery {
  driveId?: string;
}

export interface MyFileGetListQuery extends MyGetListQuery{
  driveId?: string;
  ids?: string[];
}

export interface MyFilesMoveQuery {
  files: MyFile[], 
  targets?: MyFile[],
  targetId: string
}

export interface MyFileUpdateQuery extends MyUpdateQuery {
  parentId?: string;
  targetId?: string;
}
