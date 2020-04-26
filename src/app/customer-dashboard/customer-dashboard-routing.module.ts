import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { ChildshelloutletComponent } from './childshelloutlet/childshelloutlet.component';

const routes = [
    { path: 'home', component: CustomerDashboardComponent,
    children: [
           { path: 'nomap', outlet: 'leftsidebar', component: ChildshelloutletComponent },
           // tslint:disable-next-line: max-line-length
           { path: 'map', outlet: 'leftsidebar', loadChildren: () => import('../map-start/map-start.module').then(m => m.MapStartModule), data: {animation: 'MapPage'}  },
           // tslint:disable-next-line: max-line-length
           { path: 'profile-page', outlet: 'leftsidebar', loadChildren: () => import('../profile-page/profile-page.module').then(m => m.ProfilePageModule),  data: {animation: 'ProfilePage'} },
           // tslint:disable-next-line: max-line-length
           { path: 'learning-page',outlet: 'leftsidebar', loadChildren: () => import('../learning-page/learning-page.module').then(m => m.LearningPageModule) }
         
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerDashboardRoutingModule { }