import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsGuardPage } from './reports-guard.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsGuardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsGuardPageRoutingModule {}
