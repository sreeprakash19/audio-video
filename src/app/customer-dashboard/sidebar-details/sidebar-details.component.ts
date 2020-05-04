import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar-details',
  templateUrl: './sidebar-details.component.html',
  styleUrls: ['./sidebar-details.component.css']
})
export class SidebarDetailsComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 3}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
  togglesidenav(statesidenav: boolean){    
    
    switch(statesidenav){
      case true:
        if(!this.sidenav.opened){
          this.auth.myminifab(false);          
          this.sidenav.open();
        } else{
          this.auth.myminifab(true);          
          this.sidenav.close();
        }
        break;
      case false:
        if(this.sidenav.opened){
          this.auth.myminifab(true);
          this.sidenav.close();
        }else{
          this.auth.myminifab(false);
          this.sidenav.open();
        }
        break;
    }
  }

}
