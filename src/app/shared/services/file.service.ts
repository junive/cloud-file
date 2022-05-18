import { BehaviorSubject, concatMap, EMPTY, Subject, tap } from "rxjs";
import { FileController } from "src/app/core/abstract/file.controller";
import { MyFile, MyFolder } from "../models/file/my-file";
import { MyFileSelect } from "../models/file/my-file-select";
import { MyFilesMoveQuery } from "../models/file/my-file-query";

import { Inject, Injectable } from "@angular/core";
import { Controller } from "src/app/core/abstract/controller";
import { FileQueryHelper } from "./helper/file-query.helper";
import { FileFormHelper } from "./helper/file-form.helper";
import { MySingleExistForm } from "../models/form/my-form";
import { MyMoveOptionFileForm, MyOptionsFile } from "../models/form/my-file-form";



@Injectable()
export class FileService {

  //private queryHelp: FileQueryHelper;
  private currentId: string = "";

  select$: Subject<MyFileSelect> = new Subject<MyFileSelect>();
  files$: BehaviorSubject<MyFile[]> = new BehaviorSubject<MyFile[]>([]);
  pathNav$: BehaviorSubject<MyFolder[]> = new BehaviorSubject<MyFolder[]>([]);

  timeStartA: any; 
  constructor(@Inject(Controller) private controller: FileController,
              private queryHelp: FileQueryHelper,
              private formHelp: FileFormHelper
             // @Inject(FormService) private formService: FileFormService,
              
  ) { 
    this.timeStartA = Date.now();
    // Avoid to inject it on each Local-Drop, Google-Photos modules....
    //this.dialogHelp = MyProviderModule.injector.get(FileDialogHelper);
    //this.queryHelp = MyProviderModule.injector.get(FileQueryHelper); 
    //this.dialogService = MyProviderModule.injector.get(DialogService); 
   // this.formService = MyProviderModule.injector.get(FileFormService); 

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
    //const dialog = this.dialogHelp.getNamingDialog(this.controller, targetId);
    //this.dialogHelp.openCreateFolder$(dialog).pipe(

     const model = <MySingleExistForm> {
      autofocus: true,
      required: true,
      valueExist: { key:"name", query: { driveId: targetId } }
    }
    this.formHelp.createFolder$(model).pipe(
      concatMap( (model: MySingleExistForm) => {
        const query = { name: model.value, driveId: targetId }
        return this.controller.create$(query);
      })
    ).subscribe( () => this.refreshFiles() ) 
  }

  deleteFiles(filesId: string[]) {
    this.controller.deleteList$(filesId)
      .subscribe(response => this.refreshFiles())
  }

  getController() : FileController {
    return this.controller
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
          this.formHelp.moveOptionFile$() :
          new Subject<MyMoveOptionFileForm>(); // Just beautiful ;)
      }),
      concatMap( (model: MyMoveOptionFileForm) => {
        const toKeep = model.selected === MyOptionsFile.KEEP;
        const deletesId = this.queryHelp.filterTwinsId(move);
        const queries = this.queryHelp.getMoveQueries(move, toKeep);
        return (model.selected === MyOptionsFile.REPLACE) ?
          this.controller.moveList$(queries, deletesId) :
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
        const model = <MySingleExistForm> {
          value: file.name, 
          autofocus: true,
          required: true,
          valueExist: { 
            key:"name", query: {driveId: file.parentId} 
          }
        }
        return this.formHelp.renameFile$(model);
      }),
      concatMap( (model: MySingleExistForm) => {
        const query = { id: fileId, name: model.value };
        return this.controller.update$(query);
      })
    ).subscribe( () => { this.refreshFiles() } ) 
  }



}