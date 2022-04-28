import { Component, Input, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { MyFile, MyFolder } from '../_model/my-file';
import { MyDialogInput, MyDialogSelect } from '../../modal/_model/my-modal';
import { MySvgAsset } from 'src/assets/svg';
import { MyFileConfig } from '../_model/my-file-config';
import { FileExplorerService } from '../_service/file-explorer.service';
import { FileManagerService } from '../_service/file-manager.service';
import { MyFileController } from '../_model/my-file-controller';

@Component({
  selector: "my-file-explorer",
  templateUrl: './file-explorer.html',
  styleUrls: ['./file-explorer.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    FileExplorerService,
    FileManagerService
  ],
})

export class FileExplorerComponent {

  myfiles: MyFile[] = [];
  navPath: MyFolder[] = [];
  selectedIds: string[] = [];
  mysvg = MySvgAsset;

  @Input() config: MyFileConfig = {};
  @Input() controller!: MyFileController;

  menu: any = {
    context: { hide: true, top: 0, left: 0  },
    move: { hide: true, top: 0, left: 0 }
  }

  constructor( 
    public helper: FileExplorerService,
    public manager: FileManagerService,
    public cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() { 
    this.manager.setController(this.controller);
    this.manager.getCurrentFiles$().subscribe(files => {
      this.myfiles = files;
      this.helper.setFiles(this.myfiles);
      this.cdRef.detectChanges();
    })
    this.navPath = [this.manager.getRootFolder()];
    if (this.config.initFiles) this.manager.initFiles();
  }

  ngAfterViewInit () {  }

  ngOnDestroy() {  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.menu.context.hide = true;
    this.menu.move.hide = true;
  }

  addFolderDialog() {
    const client = this.helper.openDialogSimple( 
      <MyDialogInput> { title: "Add Folder"},
      (response : MyDialogInput ) => {
        this.manager.addFolder(response.name!)
      }
    );
  }

  deleteFileEmit(): void {
    this.manager.deleteFiles(this.selectedIds)
  }


  openFileEmit(fileId: string) {
   // this.openFileEvent.emit(fileId);
  }

  openFolderEmit(folderId: string) {
    // getFile is not the same of callback
    const clickedFolder = this.helper.getFile(folderId)!;
    this.manager.openFolder(folderId, () => {
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

  moveFilesEmit(folderTargetId: string) {
    if (this.selectedIds.length == 0) return;
    const moveIds = [...this.selectedIds];
    const dialog = <MyDialogSelect> {
      title: "Imports options",
      subtitle: "One or more elements already exist",
      selection: new Map<string,string>([
        ["replace", "Replace Existing files"],
        ["keep", "Keep all files"]
      ]),
      selected: "replace"
    }
    
    const move = () => {
      this.manager.moveFiles(moveIds, folderTargetId )
    }

    const targets = (targetFiles: MyFile[]) => {
      const duplicatedIds = this.helper.getIdsByDuplicateName(targetFiles)

      const client = (response: MyDialogSelect) => {
        if (response.selected === "replace") {
          this.manager.deleteFiles( duplicatedIds, {
            refresh: false, callback: move()
          });
        } else if (response.selected === "keep") {
          this.helper.renameFiles(targetFiles);
          move();
        }
      }

      if (duplicatedIds.length == 0) move();
       else this.helper.openDialogSelect(dialog, client);
    }

    this.manager.getFiles(folderTargetId, { callback : targets });
  }

  renameFileDialog() {
    if (this.selectedIds.length == 0) return;
    const client = this.helper.openDialogSimple(
      <MyDialogInput> {
        id: this.selectedIds[0],
        title: "Rename the file"
      },
      (response: MyDialogInput) => {
        const file = this.helper.getFile(response.id!)!
        file.name = response.name!;
        this.manager.updateFile(file);
      }
    )
  }




}
