import { MyGetListQuery } from "./my-query";

export interface MyValueExistValidator {
  key: string;
  value?: string;
  query?: MyGetListQuery;
}