import { Injector, NgModule } from "@angular/core";
import { DialogService } from "../services/dialog.service";
import { FileDialogHelper } from "../services/helper/file-dialog.helper";
import { FileQueryHelper } from "../services/helper/file-query.helper";

// Declare here what will be instanciated on root
@NgModule({
  providers: [
    DialogService,
    FileDialogHelper,
    FileQueryHelper
  ]
})
export class MyProviderModule {
  static injector: Injector;
  constructor(injector: Injector) {
    MyProviderModule.injector = injector;
  } 
}
