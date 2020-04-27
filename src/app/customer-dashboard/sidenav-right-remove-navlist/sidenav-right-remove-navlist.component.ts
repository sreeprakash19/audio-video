import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';

interface Page {
  link: string;
  name: string;
  icon: string;
}
@Component({
  selector: 'app-sidenav-right-remove-navlist',
  templateUrl: './sidenav-right-remove-navlist.component.html',
  styleUrls: ['./sidenav-right-remove-navlist.component.css']
})
export class SidenavRightRemoveNavlistComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  @Input() showarrow: boolean;
  @Input() mymedia: boolean;
  imageStr = './assets/girl.png';
  @Output() flexchange = new EventEmitter<boolean>();
  isMenuOpen = true;
  contentMargin = 240;
  userloggedin = false;
  public pages: Page[] = [
    { name: 'Partners', link: 'some-link', icon: 'wc' },
    { name: 'Learning', link: 'some-link', icon: 'star' },
    { name: 'Consent', link: 'some-link', icon: 'bookmarks' },
    { name: 'Status', link: 'some-link', icon: 'inbox' },
    { name: 'Hotels', link: 'some-link', icon: 'send' },
    { name: 'Issues', link: 'some-link', icon: 'notifications' },
    { name: 'Account', link: 'some-link', icon: 'account_circle' },
    { name: 'Remove', link: 'some-link', icon: 'event_busy' }
  ];
  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.auth.user$.subscribe(userdata => {
      if (userdata !== undefined && userdata !== null) {
        this.imageStr = userdata.customphotoURL;
        this.userloggedin = true;
      } else{
        this.imageStr = './assets/girl.png';
        this.userloggedin = false;
      }
    });
  }

  ngOnInit(): void {
  }

  onToolbarMenuToggle() {
    if (this.showarrow) {
      this.flexchange.emit(false);
    } else {
      this.flexchange.emit(true);
    }
    this.isMenuOpen = !this.isMenuOpen;
  }
  rightsidenavprofileclick() {    
    if (!this.sidenav.opened) {
      this.sidenav.toggle(); //leftsidenav open if closed
    }
    //in mobile
    if (this.showarrow === true && this.mymedia === true){
      this.flexchange.emit(false);
    }
    if (this.userloggedin !== false) {

    this.router.navigate([{ outlets: { leftsidebar: ['profile-page'] } }], { relativeTo: this.route });
    } else {
      this.router.navigate([{ outlets: { leftsidebar: ['nomap'] } }], { relativeTo: this.route });
    }
  }
  rightsidenavitemsClick(selectedItem) {
    if (!this.sidenav.opened) {
      this.sidenav.toggle();
    }
    //in mobile
    if (this.showarrow === true && this.mymedia === true){
      this.flexchange.emit(false);
    }
    if (this.userloggedin !== false) {
      switch (selectedItem.name) {
        case 'Partners':
          this.router.navigate([{ outlets: { leftsidebar: ['map'] } }], { relativeTo: this.route });
          break;
        case 'Learning':
          this.router.navigate([{ outlets: { leftsidebar: ['learning-page'] } }], { relativeTo: this.route });
          break;
        default:
          break;
      }
    }else {
      this.router.navigate([{ outlets: { leftsidebar: ['nomap'] } }], { relativeTo: this.route });
    }
  }
  rightsidenavminiFabClick() {
    if (this.sidenav.opened) {
      this.sidenav.toggle();
    }
    console.log('this.showarrow', this.showarrow);
    if (this.showarrow) {
      this.flexchange.emit(false);
    } else {
      this.flexchange.emit(true);
    }
    this.isMenuOpen = !this.isMenuOpen;
  }
}
