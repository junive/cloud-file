import { Component } from "@angular/core";
import { FileService } from "../../../shared/services/file.service";

@Component({
  //selector: "my-explorer-google-photos",
  templateUrl: './google-photos.html',
  styleUrls: ['../../../../assets/scss/file.css'],
})
export class GooglePhotosComponent  {
  constructor(public service: FileService) {  }
}

