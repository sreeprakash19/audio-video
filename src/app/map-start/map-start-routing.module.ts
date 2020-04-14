import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MymapStartComponent } from './mymap-start/mymap-start.component';

const routes: Routes = [
  { path: '', component: MymapStartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapStartRoutingModule { }
