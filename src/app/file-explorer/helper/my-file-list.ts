import { MyFolder } from "src/app/_model/my-folder";
import { environment } from "src/environments/environment";
import { v4 } from "uuid";
import { MyFile } from "../../_model/my-file";

export class MyFileList {
  private mapFiles = new Map<string, MyFile[]>();
  private rootFolder: MyFolder = <MyFolder>{
    id:  environment.ROOT_FOLDER_ID,
    name: environment.ROOT_FOLDER_NAME,
    parentId:"-1"
  };
  private currentFolder: MyFolder =  this.rootFolder;

  constructor() { 
    this.addFolder(this.currentFolder); // add Root
  }

  private add(file: MyFile) : MyFile {  
    if (!file.id) file.id = v4(); // Root already have an id !
    if (file.isFolder && !this.mapFiles.get(file.id!)) {
      this.mapFiles.set(file.id!, []);
    } 
    // Trying to put a file before it's parent
    if (!this.mapFiles.get(file.parentId!)) { 
      this.mapFiles.set(file.parentId!, []);
    }
   
    this.mapFiles.get(file.parentId)!.push(file);
    return file;
  }

  addFile(file:MyFile): MyFile {
    file.isFolder = false;
    return this.add(file);
  }

  addFolder(folder: MyFolder) : MyFolder {
    folder.isFolder = true;
    return this.add(folder);
  }

  addFolderToCurrent(folderName: string): MyFolder {
    const folder: MyFolder = {
      name: folderName,
      parentId: this.getCurrentFolder().id!
    }
    return this.addFolder(folder);
  }

  // Should not be used in public : recursive
  deleteFolderById(pathId: string): boolean {
    const folder : MyFolder[] = this.mapFiles.get(pathId)!;
    if (!folder) return false;
    folder.forEach( file => {
      if (!file.isFolder) return; // continue
      this.deleteFolderById(file.id!);
    });
    return this.mapFiles.delete(pathId);
  }

  deleteFolder(folder: MyFolder): boolean {
    if (!folder || !folder.isFolder) return false; // No Folder
    return this.deleteFolderById(folder.id!);
  }

  deleteFileById(id: string): boolean {
    this.getCurrentFiles().forEach( (file, index) => {
      if (id != file.id) return; // No Match
      this.getCurrentFiles().splice(index, 1);
      return this.deleteFolder(file); // delete from mapFile
    });
    return true;
  }

  // Should be the one always use
  deleteFiles(files: MyFile[]) : boolean {
    files.forEach(file => {
      this.deleteFileById(file.id!);
    });
    return true;
  }

  getCurrentFiles(): MyFile[] {
    return this.mapFiles.get(this.getCurrentFolder().id!)!;
  }

  getFileInCurrentById(fileId: string): MyFile {
    return <MyFile> this.getCurrentFiles().find(
      file => file.id == fileId
    )!;
  }

  getRootFolder(): MyFolder {
      return this.rootFolder;
  }

  getCurrentFolder(): MyFolder {
    return this.currentFolder;
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

  setCurrentFolder(folder: MyFolder): void {
    this.currentFolder = folder;
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

  update(id: string, update: Partial<MyFile>) {
    /*let element = this.files.get(id);
    element = Object.assign(element, update);
    if (element.id) this.files.set(element.id, element);*/
  }


  updateFilesByParentId(folderId: string):void {
   
  }

  getFilesByParentId(parentId: string): void {
    const result: MyFile[] = [];
   /* this.files.forEach(element => {
      if (element.parent === folderId) {
        result.push(this.clone(element));
      }
    });
   // if (!this.querySubject) {
    //  this.querySubject = ;
    //} else {
      this.querySubject.next(result);
   // }
    
    this.querySubject.subscribe({
      next:(result:FileList) => {
        this.currentList = result;
      }
    });
    */
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