import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  mylocaluser: User = null;
  showspinner = true;
  constructor(public auth: AuthService) {
    this.auth.user$.subscribe( userdata => {
      if(userdata !== null || userdata!== undefined){
        this.mylocaluser = userdata;
      }
    });
    
   }

  ngOnInit(): void {
  }
  openDialogPersonal(){
  }
  
  openDialogPicture(){
  }
  
  openDialogDates(){
  }
  
  openDialogFamily(){
  }
  
  openDialogGreeting(){
  }
  
  NextPage(){
  }

  dosomething() {
    this.showspinner = false;
  }
}
