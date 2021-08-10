import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import {NavController} from '@ionic/angular';


@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {
    uid;
    name;
    email;
    dp;
    users = [];

    constructor(public nav: NavController) {
        this.uid = JSON.parse(localStorage.getItem('usuario'));
        console.log(this.uid.uid);
        firebase.firestore().collection('users2').doc(this.uid.uid).get().then(userData => {
            this.name = userData.data().name;
            this.email = userData.data().email;
            this.dp = userData.data().dp;
            console.log(this.name);
        });
        firebase.firestore().collection('users2').get().then(userData => {
            userData.forEach(childData => {
                if (childData.data().uid !== this.uid) {
                    this.users.push(childData.data());
                }

            });
        });
    }

    gotoChat(uid, name) {
        console.log('ASI NSON MAS CHEVERES' + uid);
        sessionStorage.setItem('uid', uid);
        sessionStorage.setItem('name', name);
        this.nav.navigateForward('/chatuser');
    }

    ngOnInit() {
    }
}
