import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-toolbar-add-input',
  templateUrl: './toolbar-add-input.component.html',
  styleUrls: ['./toolbar-add-input.component.css']
})
export class ToolbarAddInputComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
