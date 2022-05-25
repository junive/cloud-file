import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'',  redirectTo: '/local-drop/home', pathMatch: 'full'}, 
  { path:'local-drop', redirectTo: '/local-drop/home', pathMatch: 'full' },
  { path:'google-photos', redirectTo: '/google-photos/home', pathMatch: 'full' },
  {
    path:'local-drop/:driveId',
    loadChildren: () => import('./features/local-drop/local-drop.module').then(m => m.LocalDropModule)
  },{
    path:'google-photos/:driveId',
    loadChildren: () => import('./features/google-photos/google-photos.module').then(m => m.GooglePhotosModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
