import { Component, ChangeDetectorRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;
  @ViewChild('rightSidenav', { static: true }) public Sidenav: MatSidenav;
  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 7}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);
  flexsetting = '0 0 4%';
  flexMobileSetting =  '0 0 13%';

  mylat = 37.75;
  mylng = -122.41;
  cursorStyle: string;
  center = [-90.96, -0.47];
  myclick = [-90.96, -0.47];
  showFiller = false;
  LocationForm = this.fb.group({
    pincode: [629004, Validators.required]
  });

  imgdefault = './assets/girl.png';
  constructor(public auth: AuthService , media: MediaMatcher, private fb: FormBuilder, private cdr: ChangeDetectorRef){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }
  togglesidenav(statesidenav: boolean){
    
    switch(statesidenav){
      case true:
        this.flexsetting = '0 0 9%';//desktop
        this.flexMobileSetting = '0 0 30%';
        break;
      case false:
        this.flexsetting = '0 0 4%';//desktop
        this.flexMobileSetting = '0 0 13%';
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
  }
}
