import { Component, Injector } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //@ViewChild('fileLocal') local!: FileManagerComponent;
  //@ViewChild('fileGPhotos') gphoto!: FileManagerComponent;
  
  controllers: any = {}


  constructor( private injector: Injector ) {
    //this.controllers.local = this.injector.get(FileLocalController);
    //this.controllers.gphoto = this.injector.get(FileGooglePhotosController);
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  }

}
