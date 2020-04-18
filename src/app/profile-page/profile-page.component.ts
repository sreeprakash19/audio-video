import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  showspinner = true;
  constructor(public auth: AuthService) {
    
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
