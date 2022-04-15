import { Component} from '@angular/core';
import { FileLocalService } from '../_service/file-local.service';
import { FileManager } from '../file-explorer/helper/file-manager';

@Component({
  selector: 'file-local',
  templateUrl: './file-local.component.html',
  styleUrls: ['./file-local.component.css']
})

export class FileLocalComponent extends FileManager {
  override title = 'file-local';

  constructor(public fileLocalService: FileLocalService) { super(); }

  override ngOnInit() {
    super.ngOnInit();
    const folderA = this.fileList.addFolder({name: 'Folder _A', parentId: 'root' }); 
    const folderAB = this.fileList.addFolder({ name: 'Folder B', parentId: folderA.id! });
    this.fileList.addFolder({ name: 'Folder ABC', parentId: folderAB.id! });
    this.fileList.addFile({ name: 'File ABC', parentId: folderAB.id! });
    this.fileList.addFolder({name: 'Folder E', parentId: 'root' });
    this.fileList.addFolder({name: 'Folder C', parentId: 'root' });
    this.fileList.addFile({ name: 'File A', parentId: 'root' }); 

    //let titi = new MyFileList();
  
    for (let i =0; i<10000; i++) {
    
    //const folder: MyFolder = this.fileList.addFolder({ name: 'Folder 0', parentId: "root" });
      //const folder: MyFolder = titi.addFolder({ name: 'Folder 0', parentId: "root" });
     }
    this.fileList.sortbyNameASC();
    // this.fileList = titi;
   
   // const interval = setTimeout(() => {
    
    console.log("start loop");
   // console.time("loopo");
    
  }

  ngDoCheck() {

  }
  
  // When change detection has finished:
  // child components created, all *ngIfs evaluated



  ngAfterViewChecked() {


   // console.timeLog("loopo");
  }

}
