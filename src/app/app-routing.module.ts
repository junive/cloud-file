import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path:'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  } 
   /* {
    path:'local-drop',
    loadChildren: () => import('./modules/local-drop/local-drop.module').then(m => m.LocalDropModule)
  },
  {
    path:'google-photos',
    loadChildren: () => import('./modules/google-photos/google-photos.module').then(m => m.GooglePhotosModule)
  }  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
