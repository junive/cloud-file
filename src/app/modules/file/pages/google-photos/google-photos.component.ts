import { Component } from "@angular/core";
import { ExplorerFileComponent } from "../../component/explorer/explorer.component";
import { GooglePhotosFileService } from "../../../../core/http/file/google-photos.service";

@Component({
  //selector: "my-explorer-google-photos",
  templateUrl: './google-photos.html',
  styleUrls: ['../../../../../assets/scss/file.css'],
})
export class GooglePhotosFileComponent  {
  constructor(public googlePhotosService: GooglePhotosFileService) {  }
}

