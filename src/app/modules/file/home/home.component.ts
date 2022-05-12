import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../../assets/scss/home.css']
})
export class HomeFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Init Home");
  }

}
