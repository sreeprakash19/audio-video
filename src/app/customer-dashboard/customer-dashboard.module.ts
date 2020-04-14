import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AppSharedModule } from '../app-shared/app-shared.module';
import { ChildshelloutletComponent } from './childshelloutlet/childshelloutlet.component';
import { SidenavRightRemoveNavlistComponent } from './sidenav-right-remove-navlist/sidenav-right-remove-navlist.component';
import { ToolbarAddInputComponent } from './toolbar-add-input/toolbar-add-input.component';



@NgModule({
  declarations: [CustomerDashboardComponent, ChildshelloutletComponent, SidenavRightRemoveNavlistComponent, ToolbarAddInputComponent ],
  imports: [
    CommonModule,
    CustomerDashboardRoutingModule,
    AppSharedModule
  ]
})
export class CustomerDashboardModule { }
