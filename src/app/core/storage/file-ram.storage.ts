import { MyFile, MyFileCreate, MyFolder } from "../../shared-files/models/my-file";

export class FileRamStorage {
  private mapFiles: Map<string, MyFile[]> = new Map<string, MyFile[]>();
  private sequence: number= 0;

  constructor() { }

  add(fileCreate: MyFileCreate) : MyFile {
    const file = <MyFile> fileCreate;
    if (!file.id) file.id = this.v4();
    if (file.isFolder && !this.get(file.id)) {
      this.set(file.id, []);
    } 
    // Trying to put a file before it's parent
    if (!this.get(file.parentId)) {
      this.set(file.parentId, []);
    }
    this.get(file.parentId)!.push(file);
    return file;
  }

  clear() {
    this.mapFiles = new Map<string, MyFile[]>()
  }

  createFile(file:MyFileCreate): MyFile {
    file.isFolder = false;
    return this.add(file);
  }

  createFolder(folder: MyFileCreate) : MyFolder {
    folder.isFolder = true;
    return this.add(folder);
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

  deleteFile(fileId: string, cascade?:boolean) {
    const files = this.get(this.getFile(fileId).parentId);
    // Better to use this loop for speed reason
    for (let i=0; files && i < files.length; i++) {
      if (fileId != files[i].id) continue; // No Match
      if (files[i].isFolder) this.deleteFolder(fileId);
      files.splice(i, 1);  
      break;
    };
  }

  moveFile(fileId: string, targetId:string) {
    const files = this.get(this.getFile(fileId).parentId);
    // Better to use this loop for speed reason
    for (let i=0; files && i < files.length; i++) {
      if (fileId != files[i].id) continue; // No Match
      files[i].parentId = targetId;
      this.add(files[i])
      files.splice(i, 1);
      break;
    };
  }

  get(folderId: string) {
    return this.mapFiles.get(folderId);
  }

  getFile(fileId:string) : MyFile {
    let findFile!: MyFile;
    for (const [id, files] of this.mapFiles) {
      if (findFile) break;
      findFile = files.find( file => file.id == fileId )!
    }
    return findFile;
  }

  getFiles(folderId: string) : MyFile[] {
    return this.get(folderId)!;
  }

  getFilesByIds(fileIds: string[]) : MyFile[] {
    const files: MyFile[] = [];
    fileIds.forEach(id => {
      files.push(this.getFile(id))
    });
    return files;
  }

  set(folderId: string, files:MyFile[]) : void {
    this.mapFiles.set(folderId, files);
  }

  sortByNameASC(files: MyFile[]) {
    if (files.length == 0) return;
    files.sort((a,b) => {
      return Number(b.isFolder) - Number(a.isFolder);
    });
    files.sort((a,b) => {
      if (a.isFolder != b.isFolder) return 0;
      return a.name.localeCompare(b.name, 
        undefined, {numeric: true, sensitivity: 'base'});
    });
  }

  sortDriveByNameASC(folderId: string): void {
    this.sortByNameASC(this.get(folderId)!)
  }

  updateFiles(files: MyFile[]) {
    files.forEach(file => {
      this.get(file.parentId)!.forEach((oldFile, index) => { 
        if (file.id != oldFile.id) return; // No Match
        
           oldFile = file; 
      })
    });
  }

  v4(): string { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)  
    }) + this.sequence++; // Just in case ;)
  } 

}