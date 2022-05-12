import { Component } from "@angular/core";
import { ExplorerFileComponent } from "../../component/explorer/explorer.component";
import { LocalFileService } from "../../../../core/http/file/local.service";

@Component({
  //selector: "my-explorer-local",
  templateUrl: './local.html',
  styleUrls: ['../../../../../assets/scss/file.css'],
})

export class LocalFileComponent{
  constructor(public localService: LocalFileService) { 

   
  }
  
  /*
  get localService() {
    return this.service;
  }*/
}