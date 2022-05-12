import { Injector, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FileModule } from './modules/file/file.module';
import { DialogService } from './shared/services/dialog.service';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FileModule,
    AppRoutingModule, 
    RouterModule,
    SharedModule
  ],
  providers: [
    DialogService,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {
  static injector: Injector;
  constructor(injector: Injector) {
      AppModule.injector = injector;
  } 
}
 