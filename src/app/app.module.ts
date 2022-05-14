import { Injector, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MyDialogModule } from './shared/modules/dialog.module';
import { MyProviderModule } from './shared/modules/provider.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule,
    //InputSharedModule,
    MyDialogModule, // Doesn't use selectors
    MyProviderModule
    //FileSharedModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {
  static injector: Injector;
  constructor(injector: Injector) {
      AppModule.injector = injector;
  } 
}
 