import { BehaviorSubject, concatMap, EMPTY, Subject, tap } from "rxjs";
import { AppModule } from "../../../../app.module";
import { DialogService } from "../../../../shared/services/dialog.service";
import { MyDialogEnum, MyNamingDialog, MySelectingDialog } from "../../../../shared/models/dialog/my-dialog";
import { FileQueryHelper } from "../../helper/file-query.helper";
import { FileModule } from "../../file.module";
import { FileService } from "../../../../core/http/file.service";
import { MyFile, MyFolder } from "../../../../shared/models/file/my-file";
import { MyFilesMoveQuery } from "../../../../shared/models/file/my-file-query";
import { FileDialogHelper } from "../../helper/file-dialog.helper";
import { Component, Input } from "@angular/core";
import { MyFileConfig } from "src/app/shared/models/file/my-file-config";

@Component({ template:"" })
export class ExplorerFileAbstract {
  files$: Subject<MyFile[]> = new Subject<MyFile[]>();
  files: MyFile[] = [];
  navPath: MyFolder[] = [];
  queryHelp: FileQueryHelper;
  dialogHelp: FileDialogHelper;
  
  @Input() service: FileService = new FileService();
  @Input() config: MyFileConfig = {};

  constructor( 
    //public cdRef: ChangeDetectorRef
  ) {
    // injector only avoid the childreen to declare and cascade in super()
    this.dialogHelp = FileModule.injector.get(FileDialogHelper);
    this.queryHelp = FileModule.injector.get(FileQueryHelper); 
   }

  private timeStartA:any; 
  ngOnInit() {
    this.timeStartA = Date.now();
    if (!this.config.initFiles) return ;
    
    this.files$.subscribe(files => {
      this.files = [...files];
      //this.cdRef.detectChanges();
    })

    const root = this.service.getRootFolder();
    //this.service.currentId = folderId ? folderId : root.id;
    this.service.currentId = root.id;
    
    this.refreshNavPath(this.service.currentId);
    this.refreshFiles();
   
  }

  ngAfterViewInit () { 
    console.log((Date.now() - this.timeStartA))
  }

  addFolder(targetId?: string) {
    targetId = targetId ?? this.service.currentId;
    const dialog = this.dialogHelp.getNamingDialog(this.service, targetId);
    this.dialogHelp.openCreateFolder$(dialog).pipe(
      concatMap( (dialog: MyNamingDialog) => {
        const query = { name: dialog.name, driveId: targetId }
        return this.service.create$(query);
      })
    ).subscribe( () => this.refreshFiles() )
  }

  deleteFiles(filesId: string[]) {
    this.service.deleteList$(filesId)
      .subscribe(response => this.refreshFiles())
  }

  moveFiles(movesId: string[], targetId: string ) {
    const move: MyFilesMoveQuery = { files:[], targets:[], targetId: targetId }

    this.service.getList$({ ids: movesId }).pipe(
      concatMap( (moveFiles: MyFile[]) => {
        if (moveFiles.length == 0) return EMPTY;
        move.files = moveFiles;
        return this.service.getList$({driveId: targetId})
      }),
      concatMap( (targetFiles: MyFile[]) => {
        move.targets = targetFiles;
        return (this.queryHelp.hasTwin(move)) ?
          this.dialogHelp.openSelectingMove$({}):
          new BehaviorSubject<MySelectingDialog>({}); // Just beautiful ;)
      }),
      concatMap( (dialog: MySelectingDialog) => {
        const toKeep = dialog.selected === MyDialogEnum.KEEP;
        const deletesId = this.queryHelp.filterTwinsId(move);
        const queries = this.queryHelp.getMoveQueries(move, toKeep);
        return (dialog.selected === MyDialogEnum.REPLACE) ?
          this.service.moveFiles$(queries, deletesId!) :
          this.service.updateList$(queries);
      })
    ).subscribe( ()=> this.refreshFiles() );

  }
  
  openFile(fileId: string) {  }

  openFolder(folderId: string) { 
    this.service.currentId = folderId;
    this.refreshFiles$().subscribe((files: MyFile[]) => {
      this.refreshNavPath(folderId)
    });
  }

  refreshNavPath(folderId: string, cascade?: boolean) {
    if (!cascade) this.navPath = [];
    this.service.get$(folderId)
      .subscribe( (file: MyFile) => {
        this.navPath.splice(0, 0, file);
        const root = this.service.getRootFolder()
        if (file.parentId != root.parentId) {
          this.refreshNavPath(file.parentId, true)
        }
      });
  }

  refreshFiles$() {
    return this.service.getCurrentFiles$({orderBy: "asc"}).pipe(
      tap((files: MyFile[]) => this.files$.next(files) )
    );
  }

  refreshFiles() {
    this.refreshFiles$().subscribe(() => {})
  }

  renameFile(fileId: string) {
    this.service.get$(fileId).pipe(
      concatMap( (file: MyFile) => {
        const dialog = this.dialogHelp.getNamingDialog(
          this.service, file.parentId, file.name
        )
        return this.dialogHelp.openRenameFile$(dialog);
      }),
      concatMap( (dialog: MyNamingDialog) => {
        const query = { id: fileId, name: dialog.name };
        return this.service.update$(query);
      })
    ).subscribe( () => { this.refreshFiles() } )
  }

}
