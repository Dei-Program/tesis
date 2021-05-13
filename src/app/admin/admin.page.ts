import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
 public email2 = true;
  constructor(private router: Router) { }

  ngOnInit() {
      // tslint:disable-next-line:no-unused-expression
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
    private goUbication(): void {
        this.router.navigate(['ubication']);
        console.log();
    }

}
