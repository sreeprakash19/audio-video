
import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapMouseEvent, Map } from 'mapbox-gl';


export interface IGeometry {
  type: string;
  coordinates: number[];
}

@Component({
  selector: 'app-mymap-start',
  templateUrl: './mymap-start.component.html',
  styleUrls: ['./mymap-start.component.css']
})
export class MymapStartComponent implements OnInit {

  mylat = 37.75;
  mylng = -122.41;
  map: Map;
  cursorStyle: string;
  center = [-90.96, -0.47];
  myclick = [-90.96, -0.47];

  LocationForm = this.fb.group({
    pincode: [629004, Validators.required]
  });
  geometries: IGeometry[] = [];

  constructor(public auth: AuthService ,private fb: FormBuilder){

  }

  ngOnInit(): void {
        /// locate the user
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            this.mylat = position.coords.latitude;
            this.mylng = position.coords.longitude;
          });
        }

  }
  onClick(evt: MapMouseEvent) {
    if((evt as any).lngLat !== undefined){
      this.geometries.push( {
        type: 'Point',
        coordinates: [evt.lngLat.lng, evt.lngLat.lat]
        });
      this.auth.createPoint(evt.lngLat.lng, evt.lngLat.lat, 629004);
    }

  }
  Searchdb(form: FormGroup){
    this.geometries.splice(0,this.geometries.length);
    this.geometries = this.auth.getAllmyMarker(form.value.pincode);
    console.log(this.geometries);
  }



}


