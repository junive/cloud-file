import { Component} from '@angular/core';
import { FileLocalService } from '../_service/file-local.service';
import { FileManager } from '../file-explorer/helper/file-manager';
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
  
  constructor( public fileLocalService: FileLocalService,  ) {
    super();
  }
  
  override ngOnInit() {
    super.ngOnInit();
    const folderA = this.fileList.createFolder({name: 'Folder _A', parentId: environment.ROOT_FOLDER_ID }); 
    const folderAB = this.fileList.createFolder({ name: 'Folder B', parentId: folderA.id! });
    this.fileList.createFolder({ name: 'Folder ABC', parentId: folderAB.id! });
    this.fileList.createFile({ name: 'File ABC', parentId: folderAB.id! });
    this.fileList.createFolder({name: 'Folder E', parentId: environment.ROOT_FOLDER_ID });
    this.fileList.createFolder({name: 'Folder C', parentId: environment.ROOT_FOLDER_ID });
    this.fileList.createFile({ name: 'File A', parentId: environment.ROOT_FOLDER_ID }); 
    this.fileList.createFile({ name: 'File B', parentId: environment.ROOT_FOLDER_ID }); 

    //let titi = new MyFileList();
  
    for (let i =0; i<10000; i++) {
    
    const folder: MyFolder = this.fileList.createFolder({ name: 'Folder 0', parentId: environment.ROOT_FOLDER_ID });
      //const folder: MyFolder = titi.createFolder({ name: 'Folder 0', parentId: "root" });
     }
    this.fileList.sortbyNameASC();
    // this.fileList = titi;
   

    console.log("start loop");
    console.time("loopo");
    
  }

  ngAfterViewChecked() {
   console.timeEnd("loopo");

  }

  ngDoCheck() { }

  override openFolder(fileId: string) { 
    super.openFolder(fileId);
   
/*     for (let i = 0; i<10000; i++) {
      this.fileList.createFile({ 
        name: 'File 0', 
        parentId: fileId! 
      });
    } */
   

  }


}
