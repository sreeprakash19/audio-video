import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { ChildshelloutletComponent } from './childshelloutlet/childshelloutlet.component';

const routes = [
    { path: 'home', component: CustomerDashboardComponent,
    children: [
        {
            path: '',
            redirectTo: '/home/(rightsidebar:nomap)',
            pathMatch: 'full',
        },
           { path: 'nomap', outlet: 'rightsidebar', component: ChildshelloutletComponent },
           { path: 'map', outlet: 'rightsidebar', loadChildren: () => import('../map-start/map-start.module').then(m => m.MapStartModule) }
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerDashboardRoutingModule { }