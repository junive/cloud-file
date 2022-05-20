
import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { FormListener } from 'src/app/shared/listeners/form.listener';
import { FileFormHelper } from 'src/app/shared/services/helper/file-form.helper';

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