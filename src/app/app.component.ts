import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/scss/app.component.css']
})

export class AppComponent {

  constructor( private injector: Injector ,
               private router: ActivatedRoute) { }

  ngOnInit() { }

  ngAfterViewChecked() { }

  onRouterOutletActivate(component: any) { }

}
