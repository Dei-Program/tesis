import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsGuardPageRoutingModule } from './reports-guard-routing.module';

import { ReportsGuardPage } from './reports-guard.page';
import {PipesModule} from '../pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsGuardPageRoutingModule,
    PipesModule
  ],
  declarations: [ReportsGuardPage]
})
export class ReportsGuardPageModule {}
