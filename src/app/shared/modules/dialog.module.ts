import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DialogFooterComponent } from "../components/dialog/footer.component";
import { DialogHeaderComponent } from "../components/dialog/header.component";
import { NamingDialogComponent } from "../components/dialog/naming/naming.component";
import { SelectingDialogComponent } from "../components/dialog/selecting/selecting.component";
import { MyInputModule } from "./input.module";

@NgModule({
  declarations: [
    DialogHeaderComponent,
    DialogFooterComponent,
    NamingDialogComponent,
    SelectingDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MyInputModule
  ],
  exports: [
  ],

})
export class MyDialogModule { }
