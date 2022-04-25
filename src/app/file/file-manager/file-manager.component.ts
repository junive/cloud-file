import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MyFileList } from '../_helper/file-list.helper';
import { MyFile } from '../_model/my-file';
import { MyFileService } from '../_model/my-file-service';
import { MyFolder } from '../_model/my-folder';
import { DialogService } from 'src/app/dialog/dialog.service';
import { FileValidateHelper } from '../_helper/file-validate.helper';
import { MyFileConfig } from '../_model/my-file-config';

@Component({
  selector: 'my-file-manager',
  templateUrl: './file-manager.html',
  styleUrls: ['./file-manager.css']
})

export class FileManagerComponent implements OnInit {
  title = 'file-Manager';
  //@ViewChild(FileExplorerComponent) fileExplorer!: FileExplorerComponent;
  
  //private readonly onDestroy = new Subject<void>();
  
  fileList: MyFileList = new MyFileList();
  fileValidate: FileValidateHelper;
  navFolders!: MyFolder[];

  private timeStartA:any

  @Input() service!: MyFileService;
  @Input() config: MyFileConfig = {};
  
  constructor( public dialogService: DialogService ) { 
    this.fileValidate = new FileValidateHelper(this.fileList, dialogService)
  }

  ngOnInit() {
    if (!this.service) {
      throw new Error('Service not injected in FileManagerComponent');
    }

    if (this.config.initFiles) {
      this.timeStartA = Date.now();
      this.fileList.setFilesObserver(
        this.service.getRootFiles(this.fileList)
      );
       /* this.service.init().pipe(takeUntil(this.onDestroy))
      .subscribe( files => { }*/
    }
    if (!this.config.hide?.navPath) {
      this.navFolders = [this.fileList.getRootFolder()];
    }
  }


  ngAfterViewInit() {
    console.log((Date.now() - this.timeStartA))
    //setTimeout( () => {
   //}, 1000);
   }
  
  ngOnDestroy() {
    //this.onDestroy.next();
  }
  
  addFolder(name:string) {
    if (!this.fileValidate.dialogName(name)) return;
    this.fileList.createFolderToCurrent(name); 
    this.fileList.sortbyNameASC();
    this.fileList.updateFilesObserver();
  }

  deleteFiles(filesId: string[]) {
    this.fileList.deleteFiles(filesId)
    this.fileList.updateFilesObserver();
  }

  openFile(fileId: string) {
    const file: MyFile = this.fileList.getCurrentFile(fileId);
    if (!file) return;
    if (file.isFolder) return this.openFolder(file);
    
    //this.fileList.updateFilesObserver();
  }

  private openFolder(folder: MyFolder) {
    
    if (!this.config.hide?.navPath) {
      let newNav : MyFolder[] = [];
      for (let nav of this.navFolders) {
        newNav.push(nav);
        if (folder.id == nav.id) break;
      }
      if (folder) newNav.push(folder);
      this.navFolders = newNav;
    }
    this.fileList.setCurrentId(folder.id!);
    this.fileList.sortbyNameASC();
    this.fileList.updateFilesObserver();
  }
/*
  selectFiles(filesId: string[]) {  
    this.selectedFiles = this.fileList.getCurrentFiles(filesId)
  }
*/
  moveFiles(e : { filesId: string[], targetFolderId: string } ) {
    this.fileList.moveFiles(e.filesId, e.targetFolderId);
    this.fileList.updateFilesObserver();
  }

  renameFile(e : {fileId: string, newName: string} ) {
    
    if (!this.fileValidate.dialogName(e.newName)) return;
    // Correct a bug on slow angular reaction to change of name
/*  const dummyFile: MyFile =  Object.assign({}, dialog.file!); 
    dummyFile.name = dialog.name;  
    this.fileList.moveFiles(this.fileList.getCurrentId(), [dummyFile]); */
    let file: MyFile = this.fileList.getCurrentFile(e.fileId);
    if (file) file.name = e.newName;
    this.fileList.sortbyNameASC();
    this.fileList.updateFilesObserver();
  }
 
}
