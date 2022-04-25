import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { FileLocalService } from './_service/file-local.service';
import { FileGPhotoService } from './_service/file-gphoto.service';
import { FileManagerComponent } from './file/file-manager/file-manager.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //@ViewChild('fileLocal') local!: FileManagerComponent;
  //@ViewChild('fileGPhotos') gphoto!: FileManagerComponent;
  
  services: any = {}

  constructor( private injector: Injector ) {
    this.services.local = this.injector.get(FileLocalService);
    this.services.gphoto = this.injector.get(FileGPhotoService);
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  }

}
