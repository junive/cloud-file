import { MyData } from "../http/my-controller"

export interface MyFile extends MyData {
    isFolder?: boolean
    name: string
    parentId: string
}

export interface MyFolder extends MyFile { }

