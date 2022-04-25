import { Component, Input, Output, EventEmitter, ViewChild, HostListener, ElementRef,  ChangeDetectionStrategy } from '@angular/core'
import { MyFile } from '../_model/my-file';
import { MyFolder } from '../_model/my-folder';
import { MyDialogSaveInput } from '../../dialog/_model/my-dialog';
import { MySvgAsset } from 'src/assets/svg';
import { DialogService } from '../../dialog/dialog.service';
import { DialogSaveInputComponent } from 'src/app/dialog/dialog-save-input/dialog-save-input.component';

@Component({
  selector: "my-file-explorer",
  templateUrl: './file-explorer.html',
  styleUrls: ['./file-explorer.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileExplorerComponent {

  //@ViewChild('fileContainerRef', { read: ViewContainerRef  }) fileContainerRef!: ViewContainerRef;
  //@ViewChild('fileTemplateRef', { read: TemplateRef }) fileTemplateRef!: TemplateRef<any>;

  //@ViewChild("contextMenuRef") contextMenuRef!: ElementRef;
  //@ViewChild("menuMoveFileRef") moveFileMenuRef!: ElementRef;
  

  @Input() filesReact: MyFile[] = [];
  @Input() navFoldersReact: MyFolder[] = []; 
 
  selectedIds: string[] = [];
  mysvg = MySvgAsset;

  menu: any = {
    context: { hide: true, top: 0, left: 0  },
    move: { hide: true, top: 0, left: 0 }
  }
  
  @Output() addFolderEvent = new EventEmitter<string>()
  @Output() renameFileEvent = new EventEmitter<{
    fileId: string, newName: string
  }>()
  @Output() moveFileEvent = new EventEmitter<{
    filesId: string[], targetFolderId: string
  }>()
  @Output() openFileEvent = new EventEmitter<string>()
  @Output() deleteFileEvent = new EventEmitter<string[]>()


  constructor( 
    public dialogService: DialogService,
   //private cdRef: ChangeDetectorRef,
   //private renderer: Renderer2 
      ) {  }

  ngAfterViewInit () { 
    //this.fileContainerRef.createEmbeddedView(this.fileTemplateRef);
    //this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    // console.log("toto")
   }

  getFile(fileId: string) {
    return this.filesReact.find(
      file => file.id == fileId
    )
  }

  @HostListener('document:click', ['$event'])
  onDocoumentClick(event: MouseEvent) {
   this.menu.context.hide = true;
   this.menu.move.hide = true;
  }

  /*
  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: MouseEvent) {
    const targetElem: HTMLElement = (<HTMLElement>event.target);
    const fileId: string = targetElem.getAttribute("fileId")!;
    if (!targetElem || !fileId) return;
    this.openFileEmit(fileId);
  }
*/

  //@HostListener('contextmenu', ['$event'])
  openMenuContext(event: MouseEvent, fileId:string) {
    event.preventDefault();
    this.selectedIds = [];
    this.selectedIds.push(fileId);
    //const targetElem: HTMLElement = (<HTMLElement>event.target);
    //const fileId: string = targetElem.getAttribute("fileId")!
   
    //if (!targetElem || !fileId) return;
    // ToDo : improve the position on scroll, offPage etc... 
   
    this.menu.context.top =  event.pageY  + 'px'; 
    this.menu.context.left = event.pageX + 'px'; 
    this.menu.context.hide = false;
    //this.selectFilesEvent.emit([fileId])
  }


  openMenuMove(event: MouseEvent, buttonMoveFiles: any) {
    // Cannot move a single file or move file if not folder present
    //if (files.length < 2  || !files[0].isFolder ) return;
    const rect = buttonMoveFiles.getBoundingClientRect();
    
    this.menu.move.top = rect.top - 10 + 'px'; 
    this.menu.move.left = rect.right - 1 + 'px'; 
    //element.style.display = 'block';
    this.menu.move.hide = false;
  }

  //getFileContainer(): ViewContainerRef {
    //return this.fileContainer;
  //}

  //getFileTemplate(): TemplateRef<any> {
    //return this.fileTemplate;
  //}

  deleteFileEmit(): void {
    this.deleteFileEvent.emit(this.selectedIds);
  }

  moveFilesEmit(folderTargetId: string) {
    if (this.selectedIds.length == 0) return;
    this.moveFileEvent.emit( {
      filesId : this.selectedIds,
      targetFolderId : folderTargetId 
    });
  }

  openFileEmit(fileId: string) {
    this.openFileEvent.emit(fileId);
  }

  dialogRenameFile() {
    if (this.selectedIds.length == 0) return;
    const fileId = this.selectedIds[0];
    this.dialogService.openDialogSave(
      DialogSaveInputComponent, 
      <MyDialogSaveInput> {
        title: "Rename the file",
        name: this.getFile(fileId)?.name
      }
    ).subscribe(
      (response : MyDialogSaveInput) => {
        this.renameFileEvent.emit({
          fileId: this.selectedIds[0], 
          newName: response.name!
        } );
        console.log(response)
      }
    );
  }

  dialogAddFolder() {
    this.dialogService.openDialogSave(
      DialogSaveInputComponent, 
      <MyDialogSaveInput> {
        title: "Add new Folder"
      }
    ).subscribe(
      (response : MyDialogSaveInput) => {
        this.addFolderEvent.emit(response.name)
        console.log(response)
      }
    );
  }


}
