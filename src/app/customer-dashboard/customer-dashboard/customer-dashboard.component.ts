import { Component, ChangeDetectorRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterEvent, NavigationStart, NavigationEnd} from '@angular/router';
import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';
import { RouterOutlet } from '@angular/router';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('ProfilePage <=> MapPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class CustomerDashboardComponent implements OnInit {
  loading: boolean;
  arrow = false;
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;
  @ViewChild('rightSidenav', { static: true }) public Sidenav: MatSidenav;
  @ViewChild('leftSidenav', { static: true }) public LeftSidenav: MatSidenav;
  
  flexsetting = '0 0 3.8%';
  flexMobileSetting =  '0 0 13.2%';

  mylat = 37.75;
  mylng = -122.41;
  cursorStyle: string;
  center = [-90.96, -0.47];
  myclick = [-90.96, -0.47];
  showFiller = false;
  LocationForm = this.fb.group({
    pincode: [629004, Validators.required]
  });
  @ViewChild('leftSidenav', { static: true }) mainsidenav: MatSidenav;

  // tslint:disable-next-line: max-line-length
  constructor(public router: Router, public auth: AuthService , media: MediaMatcher, private fb: FormBuilder, private cdr: ChangeDetectorRef){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');//small screen
    this.mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.router.events.subscribe(
      (event: RouterEvent): void => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (event instanceof NavigationEnd) {
          this.loading = false;
        }
      }
    );
  }
  miniside(statesidenav: boolean){
    console.log('rx statesidenav from toolbar', statesidenav);
  }
  togglesidenav(statesidenav: boolean){    
    console.log('clicked leftsidenav', statesidenav );    
    this.arrow = statesidenav;
    switch(statesidenav){
      case true:
        this.flexsetting = '0 0 9%';//desktop
        this.flexMobileSetting = '0 0 30%';
        break;
      case false:
        this.flexsetting = '0 0 3.8%';//desktop
        this.flexMobileSetting = '0 0 13.2%';
        break;
    }
    console.log('Flex for mobile', this.flexMobileSetting );
  }
  getFlexOptions(){
    return  `${this.flexsetting}`;
  }
  getMobileFlexOptions(){
    return  `${this.flexMobileSetting}`;
  }
  ngOnInit(): void {
    this.auth.stringSubject.subscribe(data => {
      this.arrow = data;
      if(data === true){
        this.flexMobileSetting = '0 0 30%';
      }else{
        this.flexMobileSetting = '0 0 13.2%';
      }
    });
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
