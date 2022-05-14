import { Component } from "@angular/core";
import { FileService } from "src/app/shared/services/file.service";

@Component({
  //selector: "my-explorer-local",
  templateUrl: './local-drop.html',
  styleUrls: ['../../../../assets/scss/file.css'],
})

export class LocalDropComponent{
  constructor(public service: FileService) { 

  
  }
  
  /*
  get localService() {
    return this.service;
  }*/
}