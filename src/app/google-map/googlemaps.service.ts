import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {User} from '../shared/user.interfaces';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {subscribeOn} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class GooglemapsService {

    constructor(private geolocation: Geolocation,
                public nav: NavController, public afAuth: AngularFireAuth, private afs: AngularFirestore, private db: AngularFirestore) {
    }

    async ionViewDidLoad(user: User) {
        try {
            const uid = user.uid;
            let hear = null;
            let lat = null;
            let long = null;
            const name = user.email;
            hear = this.geolocation.watchPosition();
            hear.subscribe(res => {
                // console.log(uid);
                lat = res.coords.latitude;
                long = res.coords.longitude;
                console.log('HECHO');
                // console.log(' latitud :' + res.coords.latitude + 'longitud:' + res.coords.longitude + lat);
                // console.log('latirud robado es' + lat);
                this.db.collection('CoordsUser').doc(uid).set({
                    uid,
                    name,
                    lat,
                    long
                });
            });
        } catch (error) {
            console.log('Error-->', error);
        }
    }


}
