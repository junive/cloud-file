
import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers: [

  ],
  exports: [

  ],
})

export class HomeModule {
  static injector: Injector;
  constructor(injector: Injector) {
    HomeModule.injector = injector;
  } 
 }