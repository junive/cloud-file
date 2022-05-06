import { MyFile, MyFolder } from "../model/my-file";

export class MyFileList {
  private mapFiles: Map<string, MyFile[]> = new Map<string, MyFile[]>();

  constructor() { }

  add(file: MyFile) : MyFile {  
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

  createFile(file:MyFile): MyFile {
    file.isFolder = false;
    return this.add(file);
  }

  createFolder(folder: MyFolder) : MyFolder {
    folder.isFolder = true;
    return this.add(folder);
  }

  /*
  createFolderToCurrent(folderName: string): MyFolder {
    const folder: MyFolder = {
      name: folderName,
      parentId: this.currentFolderId
    }
    return this.createFolder(folder);
  }
*/
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

  /* deleteFiles(filesId: string[], cascade?:boolean) {
    for (let i=0; i < filesId.length; i++) {
      this.deleteFile(filesId[i], cascade);
    }
  }*/

  get(folderId: string) {
    return this.mapFiles.get(folderId);
  }
/*
  getCurrentId() {
    return this.currentFolderId;
  }
*/
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

  getFilesByNames(folderId:string, names: string[]) {
    return this.get(folderId)!.filter(
      file => names.some(name => name == file.name)
    )
  }
/*
  getCurrentFiles(filesId? : string[]): MyFile[] {
    if (filesId != undefined) {
      return this.getCurrentFiles().filter( (file) => {
        return filesId.some( fileId => file.id === fileId );
      });
    }
    return this.get(this.getCurrentId())!;
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

  /* hasSameName(fileName: string,  files: MyFile[]) {
    return files.some(file => file.name == fileName  );
  } 

  moveFiles(filesId: string[], targetFolderId: string) {
    const filesTarget: MyFile[] = this.get(targetFolderId)!;
    //const files = this.get(this.getFile(filesId[0]).parentId)!;
    for (const [id, files] of this.mapFiles) {
      files.forEach( (file, index) => {
        filesId.forEach( (id) => {
          if (file.id != id) return; // No Match
          files.splice(index, 1);
          file.parentId = targetFolderId;
          filesTarget.push(file);
        })
      });
    }
  }
*/
  set(folderId: string, files:MyFile[]) : void {
    this.mapFiles.set(folderId, files);
  }
/*
  setCurrentId(folderId: string): void {
    this.currentFolderId = folderId;
  }
*/
 
  sortByNameASC(files: MyFile[]) {
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

/*
  updateName(name: string) {
    var match = name.match(/^(.+-copy-)(\d+)$/);
    return match && match[2] !== '3'
        ? match[1] + (+match[2] + 1)
        : name + '-copy-1';
  }

  */
}