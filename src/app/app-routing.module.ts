import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFileComponent } from './modules/file/home/home.component';

const routes: Routes = [
  { 
    path:'',
    redirectTo: 'file',
    pathMatch: 'full',
    //outlet:'fileOutlet',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
