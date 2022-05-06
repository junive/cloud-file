import { BehaviorSubject, concatMap, EMPTY, Subject, tap } from "rxjs";
import { AppModule } from "src/app/app.module";
import { DialogService } from "src/app/dialog/dialog.service";
import { MyDialogEnum, MyDialogNaming, MyDialogSelecting } from "src/app/dialog/model/my-dialog";
import { FileHelper } from "../file.helper";
import { FileModule } from "../file.module";
import { FileService } from "../service/file.service";
import { MyFile, MyFilesMove, MyFolder } from "../model/my-file";

export class FileExplorerAbstract {
  files$: Subject<MyFile[]> = new Subject<MyFile[]>();
  files: MyFile[] = [];
  navPath: MyFolder[] = [];
  helper: FileHelper;
  dialogService: DialogService;

  constructor( 
    public service: FileService
    //public cdRef: ChangeDetectorRef
  ) {
    // Injector only avoid the childreen to cascade the params
    this.dialogService = AppModule.injector.get(DialogService);
    this.helper = FileModule.injector.get(FileHelper); 
   }

  initFiles(folderId?:string) {
    this.files$.subscribe(files => {
      this.files = [...files];
      //this.cdRef.detectChanges();
    })

    const root = this.service.getRootFolder();
    this.service.currentId = folderId ? folderId : root.id;
    
    this.refreshNavPath(this.service.currentId);
    this.refreshFiles();
  }

  addFolder(targetId?: string) {
    targetId = targetId ?? this.service.currentId;
    const dialog = { fileService: this.service }
    this.dialogService.openCreateFolder$(dialog).pipe(
      concatMap( (dialog: MyDialogNaming) => {
        const query = { name: dialog.name, driveId: targetId }
        return this.service.create$(query);
      })
    ).subscribe( () => this.refreshFiles() )
  }

  deleteFiles(filesId: string[]) {
    this.service.deleteFiles$(filesId)
      .subscribe(response => this.refreshFiles())
  }

  moveFiles(movesId: string[], targetId: string ) {
    const move: MyFilesMove = { files:[], targets:[], targetId: targetId }

    this.service.getFiles$({ filesId: movesId }).pipe(
      concatMap( (moveFiles: MyFile[]) => {
        if (moveFiles.length == 0) return EMPTY;
        move.files = moveFiles;
        return this.service.getFiles$({driveId: targetId})
      }),
      concatMap( (targetFiles: MyFile[]) => {
        move.targets = targetFiles;
        return (this.helper.hasTwin(move)) ?
          this.dialogService.openSelectingMove$():
          new BehaviorSubject<MyDialogSelecting>({}); // Just beautiful ;)
      }),
      concatMap( (dialog: MyDialogSelecting) => {
        const toKeep = dialog.selected === MyDialogEnum.KEEP;
        const deletesId = this.helper.filterTwinsId(move);
        const queries = this.helper.getMoveQueries(move, toKeep);
        return (dialog.selected === MyDialogEnum.REPLACE) ?
          this.service.moveFiles$(queries, deletesId) :
          this.service.updateFiles$(queries);
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
    this.service.getFile$({fileId:folderId})
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
    this.service.getFile$( { fileId: fileId } ).pipe(
      concatMap( (file: MyFile) => {
        const dialog = { name: file.name, fileService: this.service }
        return this.dialogService.openRenameFile$(dialog);
      }),
      concatMap( (dialog: MyDialogNaming) => {
        const query = { fileId: fileId, name: dialog.name };
        return this.service.updateFile$(query);
      })
    ).subscribe( () => { this.refreshFiles() } )
  }

}
