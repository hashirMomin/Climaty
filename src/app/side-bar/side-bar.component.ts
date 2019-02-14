import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    activeWheatherRoute: any;
  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    const currentRoute = this.router.url;
    const lastparams = currentRoute.split('/')[1];
    console.log('link', currentRoute, 'l', lastparams);
    if (lastparams !== null && lastparams !== undefined ) {
      this.activeWheatherRoute = (lastparams === '') ? true : false;
    }
  }

}
