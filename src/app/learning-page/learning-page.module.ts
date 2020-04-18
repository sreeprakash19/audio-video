import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../app-shared/app-shared.module';

import { LearningPageRoutingModule } from './learning-page-routing.module';
import { LearningPageComponent } from './learning-page.component';


@NgModule({
  declarations: [LearningPageComponent],
  imports: [
    CommonModule,
    LearningPageRoutingModule,
    AppSharedModule
  ]
})
export class LearningPageModule { }
