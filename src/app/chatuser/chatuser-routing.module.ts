import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatuserPage } from './chatuser.page';

const routes: Routes = [
  {
    path: '',
    component: ChatuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatuserPageRoutingModule {}
