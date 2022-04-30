import { Component, Injectable, Input } from "@angular/core";
import { BehaviorSubject, concatMap, Observable, Subject, tap } from "rxjs";
import { FileExplorerComponent } from "./file-explorer.component";
import { MyFile, MyFolder } from "../model/my-file";
import { MyFileConfig } from "../model/my-file-config";
import { MyFileController } from "../model/my-file-controller";


export class FileExplorerAbstract {

  controller!: MyFileController;

  public currentFiles: Subject<MyFile[]> = new Subject<MyFile[]>();
  private currentId?: string;

 

  constructor( 
  ) {  }

 // ngOnInit() { 
    //this.controller = this.explorer.controller;
  //}

  //ngAfterViewInit() { 
   
  //}
  
  //ngOnDestroy() { /*this.onDestroy.next();*/ }
  


  initFiles() {
    if (!this.controller) {
      throw new Error('Service not injected in FileManagerComponent');
    }
    //console.log(this.explorer.controller)
    this.currentId = this.getRootFolder().id;
    this.refreshFiles();
    
  }

  addFolder$(name:string) {
    return this.controller.addFolder(name, this.currentId!)
  }

  addFolder(name: string) {
    this.addFolder$(name).subscribe(r => this.refreshFiles());
  }

  deleteFiles$(filesId: string[]) {
    return this.controller.deleteFiles(filesId);
  }

  deleteFiles(filesId: string[]) {
    this.deleteFiles$(filesId).subscribe(r => this.refreshFiles());
  }

  getCurrentFiles$() {
    return this.currentFiles;
  }

  getFiles$(folderId: string) {
    return this.controller.getFiles(folderId);
  }

  getRootFolder() {
    return this.controller.getRootFolder();
  }

  openFile$(fileId: string) { }

  openFile(fileId: string) {  }

  openFolder$(folderId: string) { 
    this.currentId = folderId;
    return this.refreshFiles$()
  }

  moveFiles$( filesId: string[], targetFolderId: string ) {
    return this.controller.moveFiles(filesId, targetFolderId);
  }

  moveFiles( filesId: string[], targetFolderId: string ) {
    this.moveFiles$(filesId, targetFolderId)
      .subscribe(r => this.refreshFiles());
  }

  refreshFiles$() {
    return this.getFiles$(this.currentId!).pipe(
      tap( (files: MyFile[]) => {
        this.currentFiles.next([...files]);
      })
    );
  }

  refreshFiles() {
    this.refreshFiles$().subscribe();
  }


  updateFiles$(files: MyFile[]) {
    return this.controller.updateFiles(files);
  }

  updateFiles(files: MyFile[]) {
    this.updateFiles$(files).subscribe(r => this.refreshFiles());
  }

  /*
  getFilesView(): Observable<MyFile[]> {
    return this.filesObserver!;
  }
  
  setFilesObserver(obs: Observable<MyFile[]>) {
    this.filesObserver = obs//.pipe(shareReplay());
  }

  updateFilesObserver(filesId? : string[]) {
    // Have to create a new array in order to push it on view
    const result: MyFile[] = [...this.fileList.getCurrentFiles(filesId)]; 
    if (!this.filesSubject) {
      this.filesSubject = new BehaviorSubject( result );
    } else {
      this.filesSubject.next(result);
    }
    this.setFilesObserver(this.filesSubject)//.pipe(shareReplay())
  }
  */
}
