import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GooglePhotosComponent } from './components/google-photos.component';

const routes: Routes = [ {
  path: '',
  component: GooglePhotosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GooglePhotosRoutingModule { }
