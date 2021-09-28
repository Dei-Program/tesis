import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPersonPage } from './register-person.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPersonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPersonPageRoutingModule {}
