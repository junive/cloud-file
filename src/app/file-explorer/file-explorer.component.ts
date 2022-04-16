import { Component, Input, Output, EventEmitter, ViewChild, HostListener, ElementRef } from '@angular/core'
import { MatMenuTrigger } from '@angular/material/menu';
import { MyFile } from '../_model/my-file';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from './modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './modals/rename-dialog/rename-dialog.component';
import { MyFileList } from './helper/my-file-list';
import { MyFolder } from '../_model/my-folder';

@Component({
  selector: "file-explorer",
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css'],
})

export class FileExplorerComponent {

 // @ViewChild('fileContainer', { read: ViewContainerRef }) fileContainer!: ViewContainerRef;
 // @ViewChild('fileTemplate', { read: TemplateRef }) fileTemplate!: TemplateRef<any>;
  @ViewChild("myOpenMenuFileButton") menuButtonFile!: MatMenuTrigger;
  @ViewChild("menuContext") menuContext!: ElementRef;

  @Input() selectedFiles: MyFile[] = [];
  @Input() navFoldersReact: MyFolder[] | undefined;
  @Input() fileListReact: MyFileList = new MyFileList();

  @Output() addFolderEvent = new EventEmitter<string>()
  @Output() openFileEvent = new EventEmitter<string>()
  @Output() navigateFolderEvent = new EventEmitter<MyFolder>()
  @Output() moveFileEvent = new EventEmitter<{
    file: MyFile, moveTo: MyFile }>()
  @Output() deleteFileEvent = new EventEmitter<MyFile[]>()
  @Output() renameFileEvent = new EventEmitter<{
   file: MyFile, newName: string }>()
   
   
   

  constructor(public dialog: MatDialog) {  }


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
    //const buttonElem: HTMLElement = document.getElementById("toto")!;
    this.selectedFiles.push(file);
    //const rect = targetElem.getBoundingClientRect();
    
    this.menuContext.nativeElement.style.left = event.pageX + 'px'; 
    this.menuContext.nativeElement.style.top =  event.pageY  + 'px'; 
    //this.menuContext.nativeElement.classList.add("show");
    //this.menuContext.nativeElement.innerHTML = "TOTO";
    //console.log( this.menuContext.nativeElement.innerHTML) 
    // targetElem.appendChild(buttonElem);
    //this.menuButtonFile.menuData = {  fileMenuReact : file  }
    //this.menuButtonFile.openMenu();
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
 
  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (folderName: string) => {
        if (!folderName) return;
        this.addFolderEvent.emit(folderName);
    }});
  }
  
  openRenameDialog(files: MyFile[]) {
    let dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(fileName => {
      if (!fileName) return;
      this.renameFileEvent.emit({file:files[0], newName : fileName});
    });
  }


}
