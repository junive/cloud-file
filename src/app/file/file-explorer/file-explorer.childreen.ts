import { Component } from "@angular/core";
import { FileGooglePhotosService } from "../service/file-google-photos.service";
import { FileLocalService } from "../service/file-local.service";
import { FileExplorerComponent } from "./file-explorer.component";

@Component({
    selector: "my-explorer-local",
    templateUrl: './file-explorer.html',
    styleUrls: ['./file-explorer.css'],
  })
  export class FileLocalComponent extends FileExplorerComponent {
    constructor(service: FileLocalService) { super(service); }
  }
  
  @Component({
    selector: "my-explorer-google-photos",
    templateUrl: './file-explorer.html',
    styleUrls: ['./file-explorer.css'],
  })
  export class FileGooglePhotosComponent extends FileExplorerComponent {
    constructor(service: FileGooglePhotosService) { super(service); }
  }
  