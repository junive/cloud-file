import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';


//const LOCAL_SERVICE_TOKEN = new InjectionToken<string>("LocalFileService"); 
//const GOOGLE_PHOTOS_SERVICE_TOKEN = new InjectionToken<string>("GooglePhotosFileService"); 

const routes: Routes = [ {
  path:'',
  component: HomeComponent, 
  children : [
    { 
      path:'',
      redirectTo: 'local-drop',
      pathMatch: 'full'
    }, {

    path: 'local-drop', 
    loadChildren: () => import('../local-drop/local-drop.module').then(m => m.LocalDropModule)
      //data: {requiredService: LOCAL_SERVICE_TOKEN}
  },
  {

    path: 'google-photos', 
    loadChildren: () => import('../google-photos/google-photos.module').then(m => m.GooglePhotosModule)
      //data: {requiredService: LOCAL_SERVICE_TOKEN}
  }/* ,{
    path: 'google-photos',
    component: GooglePhotosFileComponent, 
      //data: {requiredService: GOOGLE_PHOTOS_SERVICE_TOKEN}
  } */]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
