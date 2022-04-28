export interface MyModal {
    title?: string
}

export interface MyDialogInput extends MyModal {
    id?: string
    name?: string
}

export interface MyDialogSelect extends MyModal {
    subtitle?:string
    selected?: string
    selection?: Map<string, string>
}


