import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFileComponent } from './home/home.component';
import { GooglePhotosFileComponent } from './pages/google-photos/google-photos.component';
import { LocalFileComponent } from './pages/local/local.component';


//const LOCAL_SERVICE_TOKEN = new InjectionToken<string>("LocalFileService"); 
//const GOOGLE_PHOTOS_SERVICE_TOKEN = new InjectionToken<string>("GooglePhotosFileService"); 

const routes: Routes = [ {
  path: 'file', 
  component: HomeFileComponent,
//  outlet: 'fileOutlet',
  children : [
    {
      path:'',
      redirectTo: 'local',
      pathMatch: 'full'
    }, {
      path: 'local', 
      component: LocalFileComponent, 
      //data: {requiredService: LOCAL_SERVICE_TOKEN}
    },{
      path: 'google-photos',
      component: GooglePhotosFileComponent, 
      //data: {requiredService: GOOGLE_PHOTOS_SERVICE_TOKEN}
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeFileRoutingModule { }
