import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapStartRoutingModule } from './map-start-routing.module';
import { MymapStartComponent } from './mymap-start/mymap-start.component';
import { AppSharedModule } from '../app-shared/app-shared.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  declarations: [MymapStartComponent],
  imports: [
    CommonModule,
    MapStartRoutingModule,
    AppSharedModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiZ21hbm9qaXNhYWMiLCJhIjoiY2s4NnhpMTQ5MGMxZzNlbXgzdGFvOGk3dyJ9.IOJ-O6nv_n35XqI7P3dpyA'
    })
  ]
})
export class MapStartModule { }
