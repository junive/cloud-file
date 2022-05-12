import { MyData } from "../http/my-data"

export interface MyFile extends MyData {
    isFolder?: boolean
    name: string
    parentId: string
}

export interface MyFolder extends MyFile { }

