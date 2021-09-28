import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {MessagePayload} from './notification-interfaces';

@Injectable({
    providedIn: 'root'
})
export class PushNotificationService {
    messagingFirebase: firebase.messaging.Messaging;

    constructor( ) {
        firebase.initializeApp(environment.firebaseConfig);
        this.messagingFirebase = firebase.messaging();
    }

    requestPermission = () => {
        return new Promise(async (resolve, reject) => {
            const permits = await Notification.requestPermission();
            if (permits === 'granted') {
                const tokenFirebase = await this.messagingFirebase.getToken();
                resolve(tokenFirebase);
            } else {
                reject(new Error('NOse otorgaron permisos'));
            }
        });
    }
    private messaginObservable = new Observable<MessagePayload> (observe => {
        this.messagingFirebase.onMessage(payload => {
            observe.next(payload);
        });
    });

    receiveMessage() {
        return this.messaginObservable;
    }
}
