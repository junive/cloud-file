import { MyData } from "../abstract/my-data"

// It's a File but without id
export interface MyFileCreate {
  isFolder?: boolean
  name: string
  parentId: string
}

export interface MyFile extends MyFileCreate, MyData { }

export interface MyFolder extends MyFile { }

export interface MyFileSelect {
  ids: string[],
  menu?: {
    mouse$: MouseEvent
  }
}
