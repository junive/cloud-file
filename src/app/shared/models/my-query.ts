export interface MyCreateQuery {
  name?:string;
}

export interface MyGetListQuery {
  orderBy?: string;
}

export interface MyUpdateQuery {
  id:string;
  name?:string;
}
