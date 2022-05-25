import { BehaviorSubject, concatMap, EMPTY, map, Observable, Subject, tap } from "rxjs";
import { FileController } from "../../core/controllers/abstract/file.controller";
import { MyFile, MyFolder } from "../models/my-file";
import { MyFileSelect } from "../models/my-file";
import { MyFilesMoveQuery } from "../models/my-file-query";
import { Inject, Injectable } from "@angular/core";
import { Controller } from "../../core/controllers/abstract/controller";
import { FileQueryService } from "./file-query.service";
import { FileFormService } from "./file-form.service";
import { MyMovingFileForm, MyNamingFileForm } from "../models/my-file-form";
import { MyRadioValue } from "../../shared/models/my-form";

@Injectable()
export class FileService {

  private currentId: string = "";

  select$: Subject<MyFileSelect> = new Subject<MyFileSelect>();
  files$: BehaviorSubject<MyFile[]> = new BehaviorSubject<MyFile[]>([]);
  pathNav$: BehaviorSubject<MyFolder[]> = new BehaviorSubject<MyFolder[]>([]);

  timeStartA: any; 
  constructor(@Inject(Controller) private controller: FileController,
              private queryService: FileQueryService,
              private formService: FileFormService           
  ) { 
    this.timeStartA = Date.now();

  }


  addFolder(targetId?: string) {
    targetId = targetId ?? this.currentId;
    this.formService.createFolder$( targetId ).pipe(
      concatMap( (model: MyNamingFileForm) => {
        const query = { name: model.naming.value, driveId: targetId }
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

  getFile$(driveId: string) {
    return this.controller.get$(driveId);
  }

  openFile(fileId: string) {  }

  openFolder(folderId?: string) {
    this.refreshFiles$(folderId!).subscribe(
      (files: MyFile[]) => this.refreshPathNav(folderId!)
    );
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
        const empty = {moving: {value: MyRadioValue.EMPTY}};
        return (this.queryService.hasTwin(move)) ?
          this.formService.moveOptionFile$() :
          new BehaviorSubject<MyMovingFileForm>(empty);
      }),
      concatMap( (model: MyMovingFileForm) => {
        const toKeep = model.moving.value === MyRadioValue.KEEP;
        const deletesId = this.queryService.filterTwinsId(move);
        const queries = this.queryService.getMoveQueries(move, toKeep);
        return (model.moving.value === MyRadioValue.REPLACE) ?
          this.controller.moveList$(queries, deletesId) :
          this.controller.updateList$(queries);
      })
    ).subscribe( ()=> this.refreshFiles() ); 

  }

  refreshFiles$(folderId? : string): Observable<MyFile[]>  {
    this.currentId = folderId ?? this.controller.getRootFolder().id;
    const query = { driveId: this.currentId, orderBy: "asc" }
    return this.controller.getList$(query).pipe(
      tap((files: MyFile[]) => this.files$.next(files) )
    );
  }

  refreshFiles() {
    this.refreshFiles$().subscribe(() => {})
  }

  refreshPathNav(folderId?: string, pathNav?: MyFolder[]) {
    folderId = folderId ?? this.currentId
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
      concatMap( (file: MyFile) => 
        this.formService.renameFile$(file.parentId, file.name)
      ),
      concatMap( (model: MyNamingFileForm) => {
        const query = { id: fileId, name: model.naming.value };
        return this.controller.update$(query);
      })
    ).subscribe( () => { this.refreshFiles() } ) 
  }

}