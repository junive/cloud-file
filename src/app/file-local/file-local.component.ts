import { Component, ElementRef, Inject, ViewChild} from '@angular/core';
import { FileLocalService } from '../_service/file-local.service';
import { FileManager } from '../file-explorer/helper/file-manager';
import { FileExplorerComponent } from '../file-explorer/file-explorer.component';
import { environment } from 'src/environments/environment';
import { MyFolder } from '../_model/my-folder';

@Component({
  selector: 'file-local',
  templateUrl: './file-local.component.html',
  styleUrls: ['./file-local.component.css']
})

export class FileLocalComponent extends FileManager {
  override title = 'file-local';

  //@ViewChild(FileExplorerComponent) fileExplorerLocal!: FileExplorerComponent;
  
  constructor(public fileLocalService: FileLocalService) {
    super();
    super.showNavigateFolder();
  }
  
  override ngOnInit() {
    super.ngOnInit();
    const folderA = this.fileList.addFolder({name: 'Folder _A', parentId: environment.ROOT_FOLDER_ID }); 
    const folderAB = this.fileList.addFolder({ name: 'Folder B', parentId: folderA.id! });
    this.fileList.addFolder({ name: 'Folder ABC', parentId: folderAB.id! });
    this.fileList.addFile({ name: 'File ABC', parentId: folderAB.id! });
    this.fileList.addFolder({name: 'Folder E', parentId: environment.ROOT_FOLDER_ID });
    this.fileList.addFolder({name: 'Folder C', parentId: environment.ROOT_FOLDER_ID });
    this.fileList.addFile({ name: 'File A', parentId: environment.ROOT_FOLDER_ID }); 

    //let titi = new MyFileList();
  
    for (let i =0; i<1000; i++) {
    
    //const folder: MyFolder = this.fileList.addFolder({ name: 'Folder 0', parentId: environment.ROOT_FOLDER_ID });
      //const folder: MyFolder = titi.addFolder({ name: 'Folder 0', parentId: "root" });
     }
    this.fileList.sortbyNameASC();
    // this.fileList = titi;
   
   // const interval = setTimeout(() => {
    
    console.log("start loop");
   // console.time("loopo");
    
  }
  ngAfterViewChecked() {
  // console.timeEnd("loopo");
  }

  ngDoCheck() {
   
  }
  
  // When change detection has finished:
  // child components created, all *ngIfs evaluated



 

}
