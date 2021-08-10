import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatuserPageRoutingModule } from './chatuser-routing.module';

import { ChatuserPage } from './chatuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatuserPageRoutingModule
  ],
  declarations: [ChatuserPage]
})
export class ChatuserPageModule {}
