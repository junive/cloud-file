import { Component, OnInit } from '@angular/core';
import { FilePhotoService } from '../_service/file-photo.service';
import { FileManager } from '../file-explorer/helper/file-manager';

@Component({
  selector: 'file-photo',
  templateUrl: './file-photo.component.html',
  styleUrls: ['./file-photo.component.css']
})
export class FilePhotoComponent extends FileManager {
  override title = 'file-photo';

  constructor(public fileService: FilePhotoService) {
    super();
  }

  override ngOnInit() {
    super.ngOnInit()
    this.fileList.addFolder({ name: 'Fold Photo', parentId: 'root' });
    this.fileList.addFile({ name: 'File Photo',  parentId: 'root' });
  }
/*
  updateFileElementQuery() {
    const rootId = this.currentRoot ? this.currentRoot.id! : 'root';
    this.fileElementsObserve = this.fileService.openFolder(rootId);
  }

  addFolder(fold: { name: string }) {
    this.fileService.add({
      isFolder: true, 
      name: fold.name, 
      parent: this.currentRoot ? this.currentRoot.id! : 'root' 
    });
    this.updateFileElementQuery();
  }
  
  removeElement(element: FileElement) {
    this.fileService.delete(element.id!);
    //this.fileElementsObserve?.pipe(
      //switchMap( (files:FileElement[]) => this.fileElements)
    //);
   // this.fileElements.
    //this.updateFileElementQuery();
  }
  
  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    this.fileService.update(event.element.id!, { parent: event.moveTo.id });
   // this.updateFileElementQuery();
  }
  
  renameElement(element: FileElement) {
    this.fileService.update(element.id!, { name: element.name });
   // this.updateFileElementQuery();
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = undefined;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.fileService.get(this.currentRoot!.parent);
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }
  
  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }
  
  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }
  */
}
