import { Component, Input, Output, EventEmitter, ViewChild, HostListener, ElementRef,  ChangeDetectionStrategy } from '@angular/core'
import { MyFile } from '../_model/my-file';
import { MyFolder } from '../_model/my-folder';
import { MySimpleDialog } from '../_model/my-simple-dialog';
import { DialogEnum } from '../_helper/dialog-enum';
import { MyDialog } from '../_model/my-dialog';
import { MySvg } from 'src/assets/svg';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogManagerService } from '../_service/dialog.service';

@Component({
  selector: "my-file-explorer",
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileExplorerComponent implements MyDialog {

  //@ViewChild('fileContainerRef', { read: ViewContainerRef  }) fileContainerRef!: ViewContainerRef;
  //@ViewChild('fileTemplateRef', { read: TemplateRef }) fileTemplateRef!: TemplateRef<any>;

  @ViewChild("contextMenuRef") contextMenuRef!: ElementRef;
  @ViewChild("moveFileMenuRef") moveFileMenuRef!: ElementRef;
  

  @Input() filesReact!: Observable<MyFile[]>;
  @Input() navFoldersReact: MyFolder[] =[];
  @Input() selectedFilesReact: MyFile[] = [];

  public dialog!: MySimpleDialog;
  public dialogEnum = DialogEnum;

  //public isRefreshingFile = false;
  public svg = MySvg;
  
  @Output() addFolderEvent = new EventEmitter<MySimpleDialog>()
  @Output() moveFileEvent = new EventEmitter<string>()
  @Output() openFileEvent = new EventEmitter<string>()
  @Output() openFolderEvent = new EventEmitter<string>()
  @Output() deleteFileEvent = new EventEmitter<void>()
  @Output() renameFileEvent = new EventEmitter<MySimpleDialog>()
  @Output() selectFilesEvent = new EventEmitter<string[]>()

  constructor( 
    private dial: DialogManagerService,
   //private cdRef: ChangeDetectorRef,
   //private renderer: Renderer2 
      ) {  }

  ngAfterViewInit () { 
    //this.fileContainerRef.createEmbeddedView(this.fileTemplateRef);
    //this.cdRef.detectChanges();
  }

  @HostListener('document:click', ['$event'])
  onDocoumentClick(event: MouseEvent) {
    this.selectedFilesReact = [];
  }
  
  private idd:string= "";
  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: MouseEvent) {
    const targetElement: HTMLElement = (<HTMLElement>event.target);
    const fileId: string = targetElement.getAttribute("fileId")!;
    const isFolder: string =  targetElement.getAttribute("isFolder")!;
    this.openFileEmit(fileId, isFolder == 'true');
  }


  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent) {
   
    event.preventDefault();
    this.selectedFilesReact = [];
    const targetElem: HTMLElement = (<HTMLElement>event.target);
    const fileId: string = targetElem.getAttribute("fileId")!;
   
    if (!targetElem || !fileId) return;
    // ToDo : improve the position on scroll, offPage etc... 
    this.contextMenuRef.nativeElement.style.left = event.pageX + 'px'; 
    this.contextMenuRef.nativeElement.style.top =  event.pageY  + 'px'; 
    this.selectFilesEvent.emit([fileId])
  }


  openMoveFileMenu(event: MouseEvent) {
   // const files: MyFile[] = this.fileListReact.getCurrentFiles()
    // Cannot move a single file or move file if not folder present
    //if (files.length < 2  || !files[0].isFolder ) return;
    const rect = this.contextMenuRef.nativeElement.getBoundingClientRect();
    const element = this.moveFileMenuRef.nativeElement;
    element.style.left = rect.right- 2 + 'px'; 
    element.style.top =  rect.top  + rect.height/3 + 'px'; 
    element.style.display = 'block';
  }

  closeMoveFileMenu() {
    this.moveFileMenuRef.nativeElement.style.display = 'none';
  }

  //getFileContainer(): ViewContainerRef {
    //return this.fileContainer;
  //}

  //getFileTemplate(): TemplateRef<any> {
    //return this.fileTemplate;
  //}

  deleteFileEmit(): void {
    this.deleteFileEvent.emit();
  }

  moveFileEmit(folderTargetId: string) {
    if (this.selectedFilesReact.length == 0) return;
    this.moveFileEvent.emit(folderTargetId);
  }

  openFileEmit(fileId: string, isFolder:boolean) {
    if (isFolder) this.openFolderEmit(fileId);
     else this.openFileEvent.emit(fileId);
  }

  openFolderEmit(folderId: string) {
    //if (this.isRefreshingFile) return;
    //this.isRefreshingFile = true;
    //this.fileContainerRef.clear();
    
    this.openFolderEvent.emit(folderId);
    
   // setTimeout( () => {
     // this.fileContainerRef.createEmbeddedView(this.fileTemplateRef); 
     // this.isRefreshingFile = false;
     // this.cdRef.detectChanges();
    //}, 0 );
  }
 
  closeDialog() {
    this.dialog.event!.emit(this.dialog);
   // setTimeout(()=> {
      if (this.dialog.error != undefined) return;

      //this.modalRef!.close();

   // }, 10)
  }

  dismissDialog() {
//    this.modalRef!.dismiss();
  }

  addDialogInfo(): void {
    if (this.dialog.enum == DialogEnum.RENAME_FILE) {
      this.dialog.title = "Rename the file";
      this.dialog.name = this.dialog.file!.name;
      this.dialog.event = this.renameFileEvent;
    }
    if (this.dialog.enum == DialogEnum.NEW_FOLDER) {
      this.dialog.title = "Add new Folder";
     // this.addFolderEvent.subscribe((e) => console.log(e));
      this.dialog.event = this.addFolderEvent;
    }
  }
  
  //async 
  openDialog(dialogEvent: MySimpleDialog) {
    //const prom =  new Promise<boolean>(resolve => {
      this.dialog = dialogEvent; // Send infos to dialogReact
      this.dialog.callback = this;
      this.addDialogInfo();

     // console.log(this.dial.getSimpleDialog());

      this.dial.openSimpleDialog();


      //this.simpleDialog.open(this.dialog);
 /*     this.modalRef = this.modalService.open(
        this.dialogTemplateRef,
        {centered:true}
      );
      this.modalRef.shown.subscribe({
        next: () => { // Autofocus bug
          const childNode = document.querySelector('.inputTextSimpleDialog');
          const childElem = (childNode) ? childNode as HTMLElement : undefined;
          if (childElem) childElem.focus();
        }
      });

      this.modalRef.closed.subscribe({
        next: () => {
          this.dialogRequest.event?.emit(this.dialogRequest);
          //dialogResponse.event?.emit(dialogResponse);
        }
      });
      */

     // this.dialog.modalRef.result.then(resolve, resolve);
     //})
   // return await prom;
  }

  /*
  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (folderName: string) => {
        if (!folderName) return;
        this.addFolderEvent.emit(folderName);
    }});
  }
  
*/

}
