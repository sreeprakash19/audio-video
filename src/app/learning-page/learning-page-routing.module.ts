import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningPageComponent } from './learning-page.component';

const routes: Routes = [{ path: '', component: LearningPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningPageRoutingModule { }
