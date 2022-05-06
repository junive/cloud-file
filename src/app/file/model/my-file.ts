export interface MyFile {
    id: string
    isFolder?: boolean
    name: string
    parentId: string
}

export interface MyFolder extends MyFile { }

export interface MyFilesMove {
    files: MyFile[], 
    targets: MyFile[], 
    targetId: string
}