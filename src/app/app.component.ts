import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'checkapp';

  constructor(public auth: AuthService){
    this.auth.isOnline$.subscribe(internetstatus =>{
      if(internetstatus === false){
        alert('Uh-oh, Connection Issue, Check Internet connection- app');
        this.auth.signOut();
      }
    });   
  }
}
