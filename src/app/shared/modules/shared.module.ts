import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DialogFooterComponent } from "../components/dialog/footer.component";
import { DialogHeaderComponent } from "../components/dialog/header.component";
import { ErrorControlComponent } from "../components/forms/error-control/error.component";
import { ValueExistDirective } from "../directives/value-exist.directive";
import { ElementPositionPipe } from "../pipes/element-position";
import { DialogListener } from "../services/dialog.listener";

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
    FormsModule,
    ReactiveFormsModule,
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
    DialogListener,
    ValueExistDirective,
    ElementPositionPipe
  ]
})
export class MySharedModule { }
