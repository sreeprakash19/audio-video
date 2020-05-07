import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-toolbar-add-input',
  templateUrl: './toolbar-add-input.component.html',
  styleUrls: ['./toolbar-add-input.component.css']
})
export class ToolbarAddInputComponent implements OnInit {
  @Output() menuchange = new EventEmitter<boolean>();
  isMenuOpen = true;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
  menuclick(){
    //console.log('clicked menu');
    if(!this.isMenuOpen) {
      this.menuchange.emit(false);
    } else {
      this.menuchange.emit(true);
    }
    this.isMenuOpen = !this.isMenuOpen;
  }

}
