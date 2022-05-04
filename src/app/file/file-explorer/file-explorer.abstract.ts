import { combineLatest, concatMap, Observable, Subject, tap } from "rxjs";
import { DialogService } from "src/app/dialog/dialog.service";
import { DialogValidator } from "src/app/dialog/dialog.validator";
import { MyDialogNaming } from "src/app/dialog/model/my-dialog";
import { MyDialogSelectingType } from "src/app/dialog/model/my-dialog-type";
import { FileHelper } from "../file.helper";
import { MyFile, MyFolder } from "../model/my-file";
import { MyFileController } from "../model/my-file-controller";


export class FileExplorerAbstract {

  controller!: MyFileController;
  validator!: DialogValidator;

  files$: Subject<MyFile[]> = new Subject<MyFile[]>();
  files: MyFile[] = [];
  //currentId: string = "";
  navPath: MyFolder[] = [];
 
  constructor( 
    public helper: FileHelper, 
    public dialogService: DialogService,
    //public cdRef: ChangeDetectorRef
  ) {  }


  initFiles(controller: MyFileController, folderId?:string) {
    this.controller = controller;
    this.files$.subscribe(files => {
      this.files = [...files];
      //this.cdRef.detectChanges();
    })
    const root = this.controller.getRootFolder();
    this.controller.currentId = folderId ? folderId : root.id;
    this.validator = new DialogValidator(this.controller);
    this.refreshNavPath(this.controller.currentId);
    this.refreshFiles();
  }

  addFolder() {
    this.dialogService.openAdd$(this.validator)
      .pipe( concatMap( (dialog: MyDialogNaming) => 
        this.controller.addFolder$(dialog.name!, this.controller.currentId)
      )
    ).subscribe( () => this.refreshFiles() )
  }

  deleteFiles(filesId: string[]) {
    const deletes$: Observable<void>[] = [];
    filesId.forEach(id => deletes$.push(this.controller.deleteFile$(id)))
    combineLatest(deletes$).subscribe(response => this.refreshFiles());
  }
/*
  getFile(fileId: string) {
    return this.files.find( file => file.id == fileId  )
  }

  getCurrentFiles$ = () =>{
    const q= {driveId:this.currentId, orderBy:"asc"}
    return this.controller.getFiles$(q);
  }
*/
  moveFiles(movesId: string[], targetId: string ) {
    const updates$: Observable<void>[] = [];
    
    const openDialog$ = (moveFiles: MyFile[], targetFiles:MyFile[]) => {
      return this.dialogService.openMove$().pipe(
        concatMap( (dialog) => {
          if (dialog!.selected === MyDialogSelectingType.MOVE_REPLACE) {
            const twins = this.helper.filterTwins(moveFiles, targetFiles);
            const queries = this.helper.getMoveQ(moveFiles, targetId);
            queries.forEach(q => updates$.push(this.controller.updateFile$(q)));
            twins.forEach(file => updates$.push(this.controller.deleteFile$(file.id)))
          }
          if (dialog!.selected === MyDialogSelectingType.MOVE_KEEP) {
            const queries = this.helper.getMoveQ(moveFiles, targetId, targetFiles);
            queries.forEach(q => updates$.push(this.controller.updateFile$(q)));
          } 
          return combineLatest(updates$);
        })
      )
    }

    this.controller.getFiles$({filesId: movesId}).pipe(
      concatMap( (moveFiles:MyFile[]) => {
        return this.controller.getFiles$({driveId: targetId}).pipe(
          concatMap( (targetFiles:MyFile[]) => {
            if (this.helper.hasTwin(moveFiles, targetFiles)) {
              return openDialog$(moveFiles, targetFiles)
            }
            const queries = this.helper.getMoveQ(moveFiles, targetId);
            queries.forEach(q => updates$.push(this.controller.updateFile$(q)));
            return combineLatest(updates$);
          })
        )
      })
    ).subscribe(()=> this.refreshFiles());

  }
  

  openFile(fileId: string) {  }

  openFolder(folderId: string) { 
    this.controller.currentId = folderId;
    this.refreshFiles$().subscribe((files: MyFile[]) => {
      this.refreshNavPath(folderId)
    });
  }

  refreshNavPath(folderId: string) {
    this.navPath = [];
    const fillNav = (id: string) => {
      this.controller.getFile$({fileId:id}).subscribe( (file: MyFile) => {
        this.navPath.splice(0, 0, file);
        const root = this.controller.getRootFolder()
        if (file.parentId != root.parentId) fillNav(file.parentId)
      })
    }
    fillNav(folderId);
  }

  private refreshFiles$() {
    const q = {driveId: this.controller.currentId, orderBy: "asc"}
    return this.controller.getFiles$(q).pipe(
      tap((files: MyFile[]) => this.files$.next(files) )
    );
  }

  refreshFiles() {
    this.refreshFiles$().subscribe(() => {})
  }

  renameFile(fileId: string) {
    const openDialog$ = (file: MyFile) => {
      const dialog = { name: file.name, validator: this.validator }
      return this.dialogService.openRename$(dialog).pipe(
        concatMap( (dialog: MyDialogNaming) => {
          const q = {fileId: file.id, name: dialog.name};
          return this.controller.updateFile$(q);
        })
      )
    }

    this.controller.getFile$({fileId:fileId}).pipe(
      concatMap(file => openDialog$(file))
    ).subscribe( () => { this.refreshFiles() } )
  }

/*
  updateFiles(files: MyFile[]) {
    this.controller.updateFiles$(files)
      .subscribe(response => this.refreshFiles());
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
