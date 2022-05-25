import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DialogFooterComponent } from "./components/dialog/footer.component";
import { DialogHeaderComponent } from "./components/dialog/header.component";
import { ErrorControlComponent } from "./components/forms/error-control/error.component";
import { ValueExistDirective } from "./directives/value-exist.directive";
import { ElementPositionPipe } from "./pipes/element-position";
import { DialogService } from "./services/dialog.service";

@NgModule({
  declarations: [
    DialogHeaderComponent,
    DialogFooterComponent,
    
    ValueExistDirective,
    ElementPositionPipe,
    ErrorControlComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    DialogHeaderComponent,
    DialogFooterComponent,
    ValueExistDirective,
    ErrorControlComponent,
    ElementPositionPipe
  ],
  providers: [
    DialogService,
    ValueExistDirective,
    ElementPositionPipe
  ]
})
export class MySharedModule { }
