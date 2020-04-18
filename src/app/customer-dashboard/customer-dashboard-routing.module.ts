import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { ChildshelloutletComponent } from './childshelloutlet/childshelloutlet.component';

const routes = [
    { path: 'home', component: CustomerDashboardComponent,
    children: [
           { path: 'nomap', outlet: 'rightsidebar', component: ChildshelloutletComponent },
           { path: 'map', outlet: 'rightsidebar', loadChildren: () => import('../map-start/map-start.module').then(m => m.MapStartModule) },
           // tslint:disable-next-line: max-line-length
           { path: 'profile-page', outlet: 'rightsidebar', loadChildren: () => import('../profile-page/profile-page.module').then(m => m.ProfilePageModule) },
           // tslint:disable-next-line: max-line-length
           { path: 'learning-page',outlet: 'rightsidebar', loadChildren: () => import('../learning-page/learning-page.module').then(m => m.LearningPageModule) }
         
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerDashboardRoutingModule { }