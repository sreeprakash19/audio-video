import { Component, ChangeDetectorRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterEvent, NavigationStart, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  loading: boolean;
  arrow = false;
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;
  @ViewChild('rightSidenav', { static: true }) public Sidenav: MatSidenav;
  @ViewChild('leftSidenav', { static: true }) public LeftSidenav: MatSidenav;
  
  flexsetting = '0 0 4%';
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
    console.log('click', statesidenav );    
    this.arrow = statesidenav;
    switch(statesidenav){
      case true:
        this.flexsetting = '0 0 9%';//desktop
        this.flexMobileSetting = '0 0 30%';
        break;
      case false:
        if(this.LeftSidenav.opened){
          this.LeftSidenav.toggle();
        }
        this.flexsetting = '0 0 4%';//desktop
        this.flexMobileSetting = '0 0 13.2%';
        break;
    }
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
}
