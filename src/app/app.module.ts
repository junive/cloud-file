import { Injector, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FileModule } from './file/file.module';
import { DialogService } from './dialog/dialog.service';
import { DialogModule } from './dialog/dialog.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FileModule,
    DialogModule,
    NgbModule
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
 