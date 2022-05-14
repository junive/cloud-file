import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['../../../../assets/scss/home.css']
})
export class HomeComponent implements OnInit {

  service! : FileService;

  constructor() { }

  ngOnInit(): void {
    console.log("Init Home");
  }

  onRouterOutletActivate(component: any) {
    this.service = component.service;
    //console.log(this.service)
  }
}
