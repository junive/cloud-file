import { Component, Input, Output, EventEmitter, ViewChild, HostListener, ElementRef, TemplateRef } from '@angular/core'
import { MyFile } from '../_model/my-file';
import { MyFileList } from './helper/my-file-list';
import { MyFolder } from '../_model/my-folder';
import { MySimpleDialog } from '../_model/my-simple-dialog';
import { DialogEnum } from '../dialog/helper/dialog-enum';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogUtil } from '../dialog/helper/dialog-util';
import { MyFileExplorer } from '../_model/my-file-explorer';
import { MyDialog } from '../_model/my-dialog';

@Component({
  selector: "file-explorer",
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css'],
})



export class FileExplorerComponent implements MyFileExplorer, MyDialog {

 // @ViewChild('fileContainer', { read: ViewContainerRef }) fileContainer!: ViewContainerRef;
 // @ViewChild('fileTemplate', { read: TemplateRef }) fileTemplate!: TemplateRef<any>;

  @ViewChild("contextMenuRef") contextMenuRef!: ElementRef;
  @ViewChild("dialogTemplate") dialogTemplateRef!: TemplateRef<any>;

  @Input() fileListReact: MyFileList = new MyFileList();
  @Input() public navFoldersReact: MyFolder[] =[];

  public dialog!: MySimpleDialog;
  public dialogEnum = DialogEnum;
  public selectedFiles: MyFile[] = [];
  public modalRef?: NgbModalRef;
  
  @Output() addFolderEvent = new EventEmitter<MySimpleDialog>()
  @Output() openFileEvent = new EventEmitter<string>()
  @Output() navigateFolderEvent = new EventEmitter<MyFolder>()
  @Output() moveFileEvent = new EventEmitter<{
    file: MyFile, moveTo: MyFile }>()
  @Output() deleteFileEvent = new EventEmitter<MyFile[]>()
  @Output() renameFileEvent = new EventEmitter<MySimpleDialog>()
   

  constructor(private modalService: NgbModal ) {  }

  ngOnInit() { }

  ngAfterViewChecked() { }

  @HostListener('document:click', ['$event'])
  onDocoumentClick(event: MouseEvent) {
    this.selectedFiles = [];
  }
  
  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: MouseEvent) {
    const targetElement: HTMLElement = (<HTMLElement>event.target);
    const fileId: string = targetElement.getAttribute("fileId")!;
    if (fileId) this.openFileEvent.emit(fileId);
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.selectedFiles = [];
    const targetElem: HTMLElement = (<HTMLElement>event.target);
    const fileId: string = targetElem.getAttribute("fileId")!;
    const file: MyFile = this.fileListReact.getFileInCurrentById(fileId);
    if (!targetElem || !fileId || !file) return;
    // ToDo : improve the position on scroll, offPage etc... 
    this.contextMenuRef.nativeElement.style.left = event.pageX + 'px'; 
    this.contextMenuRef.nativeElement.style.top =  event.pageY  + 'px'; 
    this.selectedFiles.push(file); // Show context menu
  }

  //getFileContainer(): ViewContainerRef {
    //return this.fileContainer;
  //}

  //getFileTemplate(): TemplateRef<any> {
    //return this.fileTemplate;
  //}

  deleteFileEmit(files: MyFile[]): void {
    this.deleteFileEvent.emit(files);
  }

  moveFileEmit(file: MyFile, moveTo: MyFile): void {
    this.moveFileEvent.emit({ file: file, moveTo: moveTo });
  }

  navigateFolderEmit(folder: MyFolder):void {
    this.navigateFolderEvent.emit(folder);
  }
 
  closeDialog() {
    this.dialog.event!.emit(this.dialog);
    setTimeout(()=> {
      if (this.dialog.error != undefined) return;
      this.modalRef!.close();
    }, 10)
  }

  dismissDialog() {
    this.modalRef!.dismiss();
  }

  addDialogInfo(): void {
    if (this.dialog.enum == DialogEnum.RENAME_FILE) {
      this.dialog.title = "Rename the file";
      this.dialog.name = this.dialog.file!.name;
      this.dialog.event = this.renameFileEvent;
    }
    if (this.dialog.enum == DialogEnum.NEW_FOLDER) {
      this.dialog.title = "Add new Folder";
      this.dialog.event = this.addFolderEvent;
    }
  }

  //async 
  openDialog(dialogEvent: MySimpleDialog) {
    //const prom =  new Promise<boolean>(resolve => {
      this.dialog = dialogEvent; // Send infos to dialogReact
      this.dialog.callback = this;
      this.addDialogInfo();
      this.modalRef = this.modalService.open(this.dialogTemplateRef);
      this.modalRef.shown.subscribe({
        next: () => { // Autofocus bug
          document.getElementById('inputFromRenameDialog')!.focus();
        }
      });
/*
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
