import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
 public email2 = true;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
      firebase.auth().onAuthStateChanged(user => {
          if (user){
              firebase
                  .firestore()
                  .doc('/users/${user.uid}')
                  .get()
                  .then(userProfileSnapshot => {
                      this.email2 = userProfileSnapshot.data().email2;
                  });
          }
      });
  }
    // PARA DESLOGEAR
    // private salir(): void{
    //     try{
    //         if( this.authService.logout() === true){
    //         console.log(this.authService.logout());
    //         }
    //     }
    //     catch (error){console.log('Error-->', error);
    //     }
    // }
    private goUbication(): void {
        this.router.navigate(['ubication']);
    }
    private goChat(): void {
        this.router.navigate(['chat']);
    }

}
