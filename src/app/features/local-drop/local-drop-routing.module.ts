import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalDropComponent } from './components/local-drop.component';

const routes: Routes = [ {
  path: '',
  component: LocalDropComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LocalDropRoutingModule { }
