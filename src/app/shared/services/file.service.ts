import { BehaviorSubject, concatMap, EMPTY, map, Subject, tap } from "rxjs";
import { FileController } from "src/app/core/http/file.controller";
import { MyDialogEnum, MyNamingDialog, MySelectingDialog } from "../models/dialog/my-dialog";
import { MyFile, MyFolder } from "../models/file/my-file";
import { MyFileSelect } from "../models/file/my-file-select";
import { MyFilesMoveQuery } from "../models/file/my-file-query";
import { MyProviderModule } from "../modules/provider.module";
import { FileDialogHelper } from "./helper/file-dialog.helper";
import { FileQueryHelper } from "./helper/file-query.helper";


export class FileService {
  private queryHelp: FileQueryHelper;
  private dialogHelp: FileDialogHelper;
  private currentId: string = "";
 // target$: Subject<MouseEvent> = new Subject<MouseEvent>();
  //actions$: Subject<MyFileAction> = new Subject<MyFileAction>();
  select$: Subject<MyFileSelect> = new Subject<MyFileSelect>();
  files$: BehaviorSubject<MyFile[]> = new BehaviorSubject<MyFile[]>([]);
  pathNav$: BehaviorSubject<MyFolder[]> = new BehaviorSubject<MyFolder[]>([]);

  timeStartA: any; 
  constructor(private controller: FileController) { 
    this.timeStartA = Date.now();

    this.dialogHelp = MyProviderModule.injector.get(FileDialogHelper);
    this.queryHelp = MyProviderModule.injector.get(FileQueryHelper); 

    this.initFolder(this.controller.getRootFolder().id);
  }

  initFolder(folderId: string) {
    this.refreshFiles(folderId);
    this.refreshPathNav(folderId);
  }

  subscriber() {
    /*
    this.actions$. subscribe( (actions: MyFileAction) => {
      if (actions.type == MyFileEnum.DELETE)
        this.deleteFiles(actions.picksid);
      console.log(actions)
    });*/
/*     const pick: any = {ids:[], actions:[]};
    this.picksid$.pipe(
      concatMap( (ids: string[]) =>  {
        console.log("pick")
        pick.ids = ids;
        return ids.length < 0 ? EMPTY : this.actions$
      }),
    ). subscribe( (actions: string[]) => {
      console.log(actions)
    } )   */
  }

  addFolder(targetId?: string) {
    targetId = targetId ?? this.currentId;
    const dialog = this.dialogHelp.getNamingDialog(this.controller, targetId);
    this.dialogHelp.openCreateFolder$(dialog).pipe(
      concatMap( (dialog: MyNamingDialog) => {
        const query = { name: dialog.name, driveId: targetId }
        return this.controller.create$(query);
      })
    ).subscribe( () => this.refreshFiles() )
  }

  deleteFiles(filesId: string[]) {
    this.controller.deleteList$(filesId)
      .subscribe(response => this.refreshFiles())
  }

  /*
  getCurrentFiles$(q?: MyFileGetListQuery): Observable<MyFile[]> {
    const query =  {...{ driveId: this.currentId }, ...q! }
    return this.controller.getList$(query);
  }*/

  openFile(fileId: string) {  }

  openFolder(folderId: string) { 
    this.refreshFiles$(folderId).subscribe((files: MyFile[]) => {
      this.refreshPathNav(folderId)
    });
  }


  moveFiles(movesId: string[], targetId: string ) {
    const move: MyFilesMoveQuery = { 
      files: [], targets: [], targetId: targetId 
    }

    this.controller.getList$({ ids: movesId }).pipe(
      concatMap( (moveFiles: MyFile[]) => {
        if (moveFiles.length == 0) return EMPTY;
        move.files = moveFiles;
        return this.controller.getList$({driveId: targetId})
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
          this.controller.moveFiles$(queries, deletesId) :
          this.controller.updateList$(queries);
      })
    ).subscribe( ()=> this.refreshFiles() );

  }

  refreshFiles$(folderId : string) {
    this.currentId = folderId;
    const query = { driveId: this.currentId, orderBy: "asc" }
    return this.controller.getList$(query).pipe(
      tap((files: MyFile[]) => this.files$.next(files) )
    );
  }

  refreshFiles(folderId?: string) {
    folderId = folderId ?? this.currentId;
    this.refreshFiles$(folderId).subscribe(() => {})
  }

  refreshPathNav(folderId: string, pathNav?: MyFolder[]) {
    pathNav = pathNav ?? [];
    this.controller.get$(folderId).subscribe( (file: MyFile) => {
      pathNav!.splice(0, 0, file);
      if (file.parentId != this.controller.getRootFolder().parentId) {
        this.refreshPathNav(file.parentId, pathNav)
      } else this.pathNav$.next(pathNav!);
    });
  }

  renameFile(fileId: string) {
    this.controller.get$(fileId).pipe(
      concatMap( (file: MyFile) => {
        const dialog = this.dialogHelp.getNamingDialog(
          this.controller, file.parentId, file.name
        )
        return this.dialogHelp.openRenameFile$(dialog);
      }),
      concatMap( (dialog: MyNamingDialog) => {
        const query = { id: fileId, name: dialog.name };
        return this.controller.update$(query);
      })
    ).subscribe( () => { this.refreshFiles() } )
  }



}