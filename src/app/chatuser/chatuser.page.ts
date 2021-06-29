import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';

@Component({
    selector: 'app-chatuser',
    templateUrl: './chatuser.page.html',
    styleUrls: ['./chatuser.page.scss'],
})
export class ChatuserPage implements OnInit {
    name;
    ouid;
    uid;
    chats = [];
    textMsg;

    constructor() {
        this.name = sessionStorage.getItem('name');
        this.ouid = sessionStorage.getItem('uid');
        this.uid = JSON.parse(localStorage.getItem('usuario'));
        console.log(this.uid);
        firebase.firestore().collection('chats').doc(this.uid.uid).collection(this.ouid).orderBy('time').onSnapshot(snap => {
            this.chats = [];
            snap.forEach(child => {
                this.chats.push(child.data());
            });

        });
    }

    ngOnInit() {
    }

    send() {
        firebase.firestore().collection('chats').doc(this.uid.uid).collection(this.ouid).add({
            time: Date.now(),
            uid: this.uid,
            msg: this.textMsg
        });
        firebase.firestore().collection('chats').doc(this.ouid).collection(this.uid.uid).add({
            time: Date.now(),
            uid: this.uid,
            msg: this.textMsg
        }).then(() => {
            this.textMsg = '';
        });
    }
}


