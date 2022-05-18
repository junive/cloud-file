import { MyController } from "../http/my-controller";
import { MyFolder } from "./my-file";

export interface MyFileController extends MyController {
  getRootFolder(): MyFolder;
}