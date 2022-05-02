import { Component, Input, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { MyDialogInput, MyDialogSelect } from '../../modal/_model/my-modal';
import { MySvgAsset } from 'src/assets/svg';
import { MyFileConfig } from '../model/my-file-config';
import { FileHelper } from '../file.helper';
import { FileExplorerAbstract } from './file-explorer.abstract';
import { MyFileController } from '../model/my-file-controller';
import { ModalService } from 'src/app/modal/modal.service';

@Component({
  selector: "my-file-explorer",
  templateUrl: './file-explorer.html',
  styleUrls: ['./file-explorer.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
   // FileManagerPipe
  ],
})

export class FileExplorerComponent extends FileExplorerAbstract {
  selectedIds: string[] = [];
  mysvg = MySvgAsset;

  @Input() config: MyFileConfig = {};
  @Input() fileController!: MyFileController;

  menu: any = {
    context: { hide: true, top: 0, left: 0  },
    move: { hide: true, top: 0, left: 0 }
  }

  constructor(
    helper: FileHelper, 
    modalService: ModalService,
    //cdRef: ChangeDetectorRef
  ) { 
    super(helper, modalService);
  }

  private timeStartA:any; 

  ngOnInit() { 
    this.timeStartA = Date.now();
    if (this.config.initFiles) super.initFiles(this.fileController);
  }

  ngAfterViewInit () { 
    console.log((Date.now() - this.timeStartA))
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.menu.context.hide = true;
    this.menu.move.hide = true;
  }

  addFolderEmit() {
    const dialog: MyDialogInput = {
      title: "Add Folder",
    }
    super.addFolder(dialog);
  }

  deleteFileEmit(): void {
    super.deleteFiles(this.selectedIds)
  }

  openFileEmit(fileId: string) {
    super.openFile(fileId);
  }

  openFolderEmit(folderId: string) {
    super.openFolder(folderId);
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
    const dialog = <MyDialogSelect> {
      title: "Imports options",
      subtitle: "One or more elements already exist",
      selection: new Map<string,string>([
        ["replace", "Replace Existing files"],
        ["keep", "Keep all files"]
      ]),
      selected: "replace"
    }
    super.moveFiles(dialog, [...this.selectedIds], targetId)
  }

  renameFileEmit() {
    if (this.selectedIds.length == 0) return;
    const dialog: MyDialogInput =  {
     // id: this.selectedIds[0], 
      title: "Rename the file",
      name: this.getFile(this.selectedIds[0])!.name
    }
    super.renameFile(dialog, this.selectedIds[0] );
  }
}
