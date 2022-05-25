import { MyController } from "../../shared/models/my-controller";
import { MyFolder } from "./my-file";

export interface MyFileController extends MyController {
  getRootFolder(): MyFolder;
}