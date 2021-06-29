import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

import { Router } from '@angular/router';
import { AngularFirestore} from '@angular/fire/firestore';
import { UserRegister } from '../database/models/user-register';
import firestore from 'firebase';
import firebase from 'firebase';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public name: string;
RegisterUsers: UserRegister;
  constructor(
                private authService: AuthService, private router: Router, private db: AngularFirestore) {
      this.RegisterUsers = {} as UserRegister;
  }

  ngOnInit() {
  }
  async onRegister(){
  try{
    const user = await  this.authService.register(this.RegisterUsers.email1, this.RegisterUsers.password, this.name);
    if (user){
      const isVerified = this.authService.isEmailVerified(user);
      this.redirectUser(isVerified);
      await this.authService.insertData('usersRole', this.RegisterUsers);
      console.log('TAREA CREADA PERROS');
      console.log(isVerified);
      this.RegisterUsers = {} as UserRegister;
    }
  }
  catch (error) {
    console.log('Error', error);
  }

}
  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['admin']);
      console.log(isVerified);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
