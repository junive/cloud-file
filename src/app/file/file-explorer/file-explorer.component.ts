import { Component, Input, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { MyFile, MyFolder } from '../model/my-file';
import { MyDialogInput, MyDialogSelect } from '../../modal/_model/my-modal';
import { MySvgAsset } from 'src/assets/svg';
import { MyFileConfig } from '../model/my-file-config';
import { FileHelper } from '../file.helper';
import { FileExplorerAbstract } from './file-explorer.abstract';
import { MyFileController } from '../model/my-file-controller';
import { combineLatest, concatMap, EMPTY, filter, forkJoin, map, of, Subject, switchMap, takeUntil, takeWhile, withLatestFrom } from 'rxjs';

@Component({
  selector: "my-file-explorer",
  templateUrl: './file-explorer.html',
  styleUrls: ['./file-explorer.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
   // FileManagerPipe
  ],
})

export class FileExplorerComponent extends FileExplorerAbstract {

  myfiles: MyFile[] = [];
  navPath: MyFolder[] = [];
  selectedIds: string[] = [];
  //manager: FileManagerPipe
  mysvg = MySvgAsset;

  @Input() config: MyFileConfig = {};
  @Input() pipeController!: MyFileController;

  menu: any = {
    context: { hide: true, top: 0, left: 0  },
    move: { hide: true, top: 0, left: 0 }
  }

  constructor( 
    public helper: FileHelper,
   // public manager: FileManagerService,
    public cdRef: ChangeDetectorRef
  ) { 
    super();
   // this.manager = new FileManagerPipe(this);
  }

  private timeStartA:any; 

  ngOnInit() { 
    this.timeStartA = Date.now();
    super.controller = this.pipeController;
    this.getCurrentFiles$().subscribe(files => {
      this.myfiles = files;
      this.cdRef.detectChanges();
    })
    this.navPath = [this.getRootFolder()];
    if (this.config.initFiles) this.initFiles();
  }


  ngAfterViewInit () { 
    console.log((Date.now() - this.timeStartA))
   }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.menu.context.hide = true;
    this.menu.move.hide = true;
  }

  addFolderDialog() {
    const dialog = this.helper.dialogInputAddFolder;
    this.helper.openDialogInput(dialog, this.myfiles, () => {
      this.addFolder(dialog.name!)
    });

  }

  deleteFileEmit(): void {
    this.deleteFiles(this.selectedIds)
  }

  getFile(fileId: string) {
    return this.myfiles.find( file => file.id == fileId  )
  }

  openFileEmit(fileId: string) {
   // this.openFileEvent.emit(fileId);
  }

  openFolderEmit(folderId: string) {
    // getFile() is not the same after subscribing
    const clickedFolder = this.getFile(folderId)!;
    this.openFolder$(folderId).subscribe(() => {
      this.navPath = this.helper.getNavPath(this.navPath, folderId);
      if (clickedFolder) this.navPath.push(clickedFolder);
    });
    
  }

  openMenuContext(event: MouseEvent, fileId:string) {
    event.preventDefault();
    this.selectedIds = [];
    this.selectedIds.push(fileId);
    this.menu.context.top =  event.pageY  + 'px'; 
    this.menu.context.left = event.pageX + 'px'; 
    this.menu.context.hide = false;
  }

  openMenuMove(event: MouseEvent, buttonMoveFiles: any) {
    // Cannot move a single file or move file if not folder present
    //if (files.length < 2  || !files[0].isFolder ) return;
    const rect = buttonMoveFiles.getBoundingClientRect();
    this.menu.move.top = rect.top - 10 + 'px'; 
    this.menu.move.left = rect.right - 1 + 'px'; 
    this.menu.move.hide = false;
  }

  moveFilesEmit(targetId: string) {
    if (this.selectedIds.length == 0) return;

    const moveIds = [...this.selectedIds];
    const moveFiles = this.helper.filterIds(moveIds, this.myfiles);

    const dialog = <MyDialogSelect> {
      title: "Imports options",
      subtitle: "One or more elements already exist",
      selection: new Map<string,string>([
        ["replace", "Replace Existing files"],
        ["keep", "Keep all files"]
      ]),
      selected: "replace"
    }

    this.getFiles$(targetId).pipe(
      concatMap( (targetFiles: MyFile[]) => {
        const sameFiles = this.helper.filterSameNames(moveFiles, targetFiles);
        return (sameFiles.length == 0) ?
          this.moveFiles$(moveIds, targetId) :
          this.helper.openDialogSelect$(dialog).pipe(
          concatMap( (dialogResponse:MyDialogSelect) => {
            if (dialogResponse.selected === "replace") {
              const targetIds = sameFiles.map(file => file.id);
              return combineLatest([
                this.moveFiles$(moveIds, targetId),
                this.deleteFiles$(targetIds)
              ])
            } 
            if (dialogResponse.selected === "keep") {
              this.helper.renameFiles(moveFiles, targetFiles);
              return combineLatest([
                this.updateFiles$(moveFiles),
                this.moveFiles$(moveIds, targetId)
              ])
            } 
            return EMPTY;
          })
        )
    })
    ).subscribe(() => this.refreshFiles() );
  }

  renameFileDialog() {
    if (this.selectedIds.length == 0) return;
   
    const dialog = this.helper.dialogInputRename;
    dialog.id = this.selectedIds[0], 
    dialog.name = this.getFile(this.selectedIds[0])!.name

    this.helper.openDialogInput(
      dialog, this.myfiles, () => {
        const file = this.getFile(dialog.id!)!
        file.name = dialog.name!;
        this.updateFiles([file]);
      }
    )


/*


    this.helper.openDialogInput$(dialog).subscribe(
      (response: MyDialogInput) => {
        if (this.helper.closeDialogSimple(response.name!, this.myfiles)) {
          const file = this.getFile(response.id!)!
          file.name = response.name!;
          this.manager.updateFiles([file]);
        }
      }
    )
    */
  }




}
