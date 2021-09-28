import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPersonPageRoutingModule } from './register-person-routing.module';

import { RegisterPersonPage } from './register-person.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPersonPageRoutingModule
  ],
  declarations: [RegisterPersonPage]
})
export class RegisterPersonPageModule {}
