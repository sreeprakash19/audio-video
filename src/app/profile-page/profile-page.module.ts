import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../app-shared/app-shared.module';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent, DialogOverviewExampleDialog} from './profile-page.component';


@NgModule({
  declarations: [ProfilePageComponent,DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    AppSharedModule
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ]

})
export class ProfilePageModule { }
