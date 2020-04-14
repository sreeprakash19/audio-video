import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
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

  @Input() imageStr: string;
  @Output() flexchange = new EventEmitter<boolean>();
  isMenuOpen = true;
  contentMargin = 240;

  public pages: Page[] = [
    {name: 'Partners', link: 'some-link', icon: 'wc'},
    {name: 'Learning', link: 'some-link', icon: 'star'},
    {name: 'Consent', link: 'some-link', icon: 'bookmarks'},
    {name: 'Status', link: 'some-link', icon: 'inbox'},
    {name: 'Hotels', link: 'some-link', icon: 'send'},
    {name: 'Issues', link: 'some-link', icon: 'notifications'},
    {name: 'Account', link: 'some-link', icon: 'account_circle'},
    {name: 'Remove', link: 'some-link', icon: 'event_busy'}
  ];
  constructor(private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    console.log(this.imageStr);
  }
  onToolbarMenuToggle() {
    if(!this.isMenuOpen) {
      this.flexchange.emit(false);
    } else {
      this.flexchange.emit(true);
    }
    this.isMenuOpen = !this.isMenuOpen;
  }
  handleClick(selectedItem) {
    switch(selectedItem.name){
      case 'Partners':
        this.sidenav.toggle();
        this.router.navigate([{ outlets: {  rightsidebar: ['map'] } }] , {relativeTo: this.route});
        break;
    }
  }

}