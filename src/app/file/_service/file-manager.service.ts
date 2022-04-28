import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { MyFile, MyFolder } from "../_model/my-file";
import { MyFileController } from "../_model/my-file-controller";

interface Options {
  refresh?: boolean, 
  callback?: any
}

@Injectable()
export class FileManagerService {

  controller!: MyFileController;
  // @Input() config: MyFileConfig = {};
  
  public currentFiles: Subject<MyFile[]> = new Subject<MyFile[]>();

  private currentId?: string;


  private timeStartA:any;
  
  constructor( ) {  }

  ngOnInit() { }

  ngAfterViewInit() {  console.log((Date.now() - this.timeStartA)) }
  
  ngOnDestroy() { /*this.onDestroy.next();*/ }
  
  initFiles() {
    if (!this.controller) {
      throw new Error('Service not injected in FileManagerComponent');
    }
    
    
    this.timeStartA = Date.now();
    this.currentId = this.getRootFolder().id;
    this.refreshFiles();
    
        /* this.service.init().pipe(takeUntil(this.onDestroy))
    .subscribe( files => { }*/
    
  }

  addFolder(name: string) {
    this.controller.addFolder(name, this.currentId!)
      .subscribe(response => this.refreshFiles());
  }

  deleteFiles(filesId: string[], opt?: Options) {
    this.controller.deleteFiles(filesId)
      .subscribe(response => {
        if (opt!.callback) opt!.callback();
        if (opt!.refresh) this.refreshFiles();
      });
  }

  getCurrentFiles$() {
    return this.currentFiles;
  }

  getFiles(folderId: string, opt?: Options) {
    this.getFiles$(folderId).subscribe(files => {
      if (opt!.callback) opt!.callback(files);
    })
  }

  getFiles$(folderId: string) {
    return this.controller.getFiles(folderId);
  }

  getRootFolder() {
    return this.controller.getRootFolder();
  }

  openFile(fileId: string) {
    // const file: MyFile = this.fileList.getCurrentFile(fileId);
  }

  openFolder(folderId: string, callBack: any) { 
    this.currentId = folderId;
    this.refreshFiles(callBack)
  }

  moveFiles( filesId: string[], targetFolderId: string ) {
    this.controller.moveFiles(filesId, targetFolderId)
      .subscribe(response => this.refreshFiles());
  }

  refreshFiles(callBack?: any) {
    this.getFiles$(this.currentId!).subscribe(files => {
        this.currentFiles.next([...files]);
        if (callBack && typeof callBack === 'function') callBack();
    });
  }

  setController(newController: MyFileController) {
      this.controller = newController;
  }

  updateFile(file: MyFile) {
    this.controller.updateFile(file)
      .subscribe(response => this.refreshFiles());
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
