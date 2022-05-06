import { Injector, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FileModule } from './file/file.module';
import { DialogService } from './dialog/dialog.service';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FileModule,
    DialogModule
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
 