import { Optional } from "@angular/core";
import { BehaviorSubject, Observable, shareReplay } from "rxjs";
import { MyFolder } from "src/app/_model/my-folder";
import { environment } from "src/environments/environment";
import { v4 } from "uuid";
import { MyFile } from "../_model/my-file";

export class MyFileList {
  private rootFolder: MyFolder = <MyFolder>{
    id:  environment.ROOT_FOLDER_ID,
    name: environment.ROOT_FOLDER_NAME,
    parentId: "-1"
  };
  private mapFiles: Map<string, MyFile[]> = new Map<string, MyFile[]>();
  private currentFolderId = this.rootFolder.id!;
  private filesSubject!: BehaviorSubject<MyFile[]>;
  private filesObserver!: Observable<MyFile[]>;

  constructor() { 
    this.clear();
  }

  add(file: MyFile) : MyFile {  
    if (!file.id) file.id = v4(); // Root or move already have an id !
    if (file.isFolder && !this.get(file.id!)) {
      this.set(file.id!, []);
    } 
    // Trying to put a file before it's parent
    if (!this.get(file.parentId)) {
      this.set(file.parentId!, []);
    }
    this.get(file.parentId)!.push(file);
    return file;
  }

  clear() {
    this.mapFiles = new Map<string, MyFile[]>()
    this.createFolder(this.rootFolder);
  }

  createFile(file:MyFile): MyFile {
    file.isFolder = false;
    return this.add(file);
  }

  createFolder(folder: MyFolder) : MyFolder {
    folder.isFolder = true;
    return this.add(folder);
  }

  createFolderToCurrent(folderName: string): MyFolder {
    const folder: MyFolder = {
      name: folderName,
      parentId: this.currentFolderId
    }
    return this.createFolder(folder);
  }

  // Should Use deleteFile() in public
  deleteFolder(folderId: string) {
    const files = this.get(folderId)!;
    for (let i=0; files && i < files.length; i++) {
      if (!files[i].isFolder) continue;
      this.deleteFolder(files[i].id!);
    }
    this.mapFiles.delete(folderId);
  }

  deleteFile(fileId: string) {
    const files = this.getCurrentFiles();
    // Better to use this loop for speed reason
    for (let i=0; files && i < files.length; i++) {
      if (fileId != files[i].id) continue; // No Match
      if (files[i].isFolder) this.deleteFolder(fileId);
      files.splice(i, 1);  
      break;
    };
  }

  deleteFiles(filesId: string[]) {
    for (let i=0; i < filesId.length; i++) {
      this.deleteFile(filesId[i]);
    }
  }

  get(folderId: string) {
    return this.mapFiles.get(folderId);
  }

  getCurrentId() {
    return this.currentFolderId;
  }

  getCurrentFiles(filesId? : string[]): MyFile[] {
    if (filesId != undefined) {
      return this.getCurrentFiles().filter( (file) => {
        return filesId.some( fileId => file.id === fileId );
      });
    }
    return this.get(this.getCurrentId())!;
  }


  getFilesObserver(): Observable<MyFile[]> {
    return this.filesObserver;
  }


  getCurrentFile(fileId: string): MyFile {
    return this.getCurrentFiles().find(
      file => file.id == fileId
    )!;
  }

  getRootFolder(): MyFolder {
      return this.rootFolder;
  }

  getMapFiles(): Map<string, MyFile[]>{
    return this.mapFiles;
  }

  hasSameFile(fileName: string): boolean {
    let hasSameName: boolean = false;
    if (!this.getCurrentFiles()) return false;
    this.getCurrentFiles().forEach(file => {
      if (file.name == fileName) hasSameName = true;
    });
    return hasSameName;
  }

  moveFiles(folderTargetId: string, filesToMove: MyFile[]) {
    const filesRemove: MyFile[] = this.get(filesToMove[0].parentId)!;
    const filesTarget: MyFile[] = this.get(folderTargetId)!
    filesRemove.forEach( (fileRemove, index) => {
      filesToMove.forEach( (fileToMove) => {
        if (fileRemove.id != fileToMove.id) return; // No Match
        filesRemove.splice(index, 1);
        fileToMove.parentId = folderTargetId;
        filesTarget.push(fileToMove);
      })
    });
  }


  set(folderId: string, files:MyFile[]) : void {
    this.mapFiles.set(folderId, files);
  }

  setCurrentId(folderId: string): void {
    this.currentFolderId = folderId;
  }

  setFilesObserver(obs: Observable<MyFile[]>) {
    this.filesObserver = obs//.pipe(shareReplay());
  }

  private sortByFolderASC(): void {
    this.getCurrentFiles().sort((a,b) => {
      return Number(b.isFolder) - Number(a.isFolder);
    });
  }

  sortbyNameASC(): void {
    this.sortByFolderASC();
    this.getCurrentFiles().sort((a,b) => {
      if (a.isFolder != b.isFolder) return 0;
      return a.name.localeCompare(b.name);
    });
  }

  updateFilesObserver(filesId? : string[]) {
    const result: MyFile[] = [...this.getCurrentFiles(filesId)]; 
    if (!this.filesSubject) {
      this.filesSubject = new BehaviorSubject( result );
    } else {
      this.filesSubject.next(result);
    }
    this.setFilesObserver(this.filesSubject)//.pipe(shareReplay())
  }



/*
  getFileById(id: string) {
     return this.files.get(id)!;
  }

  getAll() {
    return this.files;
  }

  
  clone(file: MyFile) {
    return JSON.parse(JSON.stringify(file))
  }
  */
}