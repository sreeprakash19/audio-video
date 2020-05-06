import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../app-shared/app-shared.module';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent, DialogAudio,DialogPictures} from './profile-page.component';


@NgModule({
  declarations: [ProfilePageComponent,DialogAudio,DialogPictures],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    AppSharedModule
  ],
  entryComponents: [
    DialogAudio,DialogPictures
  ]

})
export class ProfilePageModule { }
