import { Component } from "@angular/core"
import { DialogNamingComponent } from "./dialog-naming.component"

@Component({
  templateUrl: './dialog-naming.html', styleUrls: ['../dialog.css']
})
export class DialogRenameFileComponent extends DialogNamingComponent{
  override title: string = "Rename the file"
}

@Component({
  templateUrl: './dialog-naming.html', styleUrls: ['../dialog.css']
})
export class DialogCreateFolderComponent extends DialogNamingComponent{
  override title: string = "Create a new folder"
}
