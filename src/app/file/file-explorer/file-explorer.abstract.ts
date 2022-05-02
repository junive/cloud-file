import { ReturnStatement } from "@angular/compiler";
import { ChangeDetectorRef } from "@angular/core";
import { combineLatest, concatMap, EMPTY, Observable, Subject, tap } from "rxjs";
import { ModalService } from "src/app/modal/modal.service";
import { MyDialogInput, MyDialogSelect } from "src/app/modal/_model/my-modal";
import { FileHelper } from "../file.helper";
import { MyFile, MyFolder } from "../model/my-file";
import { MyFileController } from "../model/my-file-controller";


export class FileExplorerAbstract {

  controller!: MyFileController;

  files$: Subject<MyFile[]> = new Subject<MyFile[]>();
  files: MyFile[] = [];
  currentId: string = "";
  navPath: MyFolder[] = [];
 

  constructor( 
    public helper: FileHelper, 
    public modalService: ModalService,
    //public cdRef: ChangeDetectorRef
  ) {  }


  initFiles(controller: MyFileController, folderId?:string) {
    this.controller = controller;
    this.files$.subscribe(files => {
      this.files = [...files];
      //this.cdRef.detectChanges();
    })
    const root = this.controller.getRootFolder()
    this.navPath = [root];
    this.currentId = folderId ? folderId : root.id;
    this.refreshFiles();
  }

  addFolder(dialog: MyDialogInput) {
    dialog.files$ = this.getCurrentFiles$();
    this.modalService.openDialogInput$(dialog).pipe(concatMap( () => 
        this.controller.addFolder$(dialog.name!, this.currentId!)
    )).subscribe(()=> this.refreshFiles())
    
  }

  deleteFiles(filesId: string[]) {
    this.controller.deleteFiles$(filesId)
      .subscribe(response => this.refreshFiles());
  }

  getFile(fileId: string) {
    return this.files.find( file => file.id == fileId  )
  }

  getCurrentFiles$() {
    return this.controller.getFiles$(this.currentId);
  }

  moveFiles(dialog:MyDialogSelect, moveIds: string[], targetId: string ) {
    const moveFiles = this.helper.filterFiles(moveIds, this.files);
    this.controller.getFiles$(targetId).pipe(
      concatMap( (targetFiles: MyFile[]) => {
        const duplicateFiles = this.helper.filterSameNames(moveFiles, targetFiles);
        return (duplicateFiles.length == 0) ?
          this.controller.moveFiles$(moveIds, targetId) :
          this.modalService.openDialogSelect$(dialog).pipe(
          concatMap( () => {
            if (dialog.selected === "replace") {
              const targetIds = duplicateFiles.map(file => file.id);
              return combineLatest([
                this.controller.moveFiles$(moveIds, targetId),
                this.controller.deleteFiles$(targetIds)
              ])
            } 
            if (dialog.selected === "keep") {
              this.helper.renameFiles(moveFiles, targetFiles);
              return combineLatest([
                this.controller.updateFiles$(moveFiles),
                this.controller.moveFiles$(moveIds, targetId)
              ])
            } 
            return EMPTY;
          })
        )
      }
    )).subscribe(() => this.refreshFiles() );
  }


  openFile(fileId: string) {  }

  openFolder(folderId: string) { 
    const clickedFolder = this.getFile(folderId)!;
    this.refreshFiles$(folderId).subscribe(() => {
      this.navPath = this.helper.getNavPath(this.navPath, folderId);
      if (clickedFolder) this.navPath.push(clickedFolder);
      //this.cdRef.detectChanges(); 
    });
  }

  refreshFiles$(folderId? : string) {
    if (folderId) this.currentId = folderId;
    return this.controller.getFiles$(this.currentId).pipe( 
      tap( (files: MyFile[]) => this.files$.next(files))
    );
  }

  refreshFiles() {
    this.refreshFiles$().subscribe();
  }

  renameFile(dialog: MyDialogInput, fileId: string) {
    dialog.files$ =  this.getCurrentFiles$();
    this.modalService.openDialogInput$(dialog)
      .subscribe({ complete:() => {
        const file = this.getFile(fileId)!
        file.name = dialog.name!;
        this.updateFiles([file]);
      }
    })
  }

  updateFiles(files: MyFile[]) {
    this.controller.updateFiles$(files)
      .subscribe(response => this.refreshFiles());
  }

  /*

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
