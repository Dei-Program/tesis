import {AfterViewInit, Component, Input, Renderer2, OnInit, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import {User} from '../shared/user.interfaces';

declare let google;
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LoadingController, NavController} from '@ionic/angular';
import {Marker} from '../database/models/markers';
import firebase from 'firebase';


@Component({
    selector: 'app-ubication',
    templateUrl: './ubication.page.html',
    styleUrls: ['./ubication.page.scss'],
})
export class UbicationPage implements OnInit, AfterViewInit, OnChanges {
    mapRef = null;
    interval: any;
    public mapElementRef: ElementRef;
    markers: Marker[] = [
        {
            position: {
                lat: 4.5454,
                lng: -76.34343,
            },
            title: 'PARQUE'
        },
        {
            position: {
                lat: 54.5454,
                lng: -56.34343,
            },
            title: 'PARQUE 2'
        }
    ];
    uid;
    name;
    email;
    dp;
    users = [];
    lat;
    long;
    marker;
    coordinates;
    myLatLng;
    map;

    constructor(
        private geolocation: Geolocation,
        private loadCtrl: LoadingController,
        public nav: NavController,
        public renderer: Renderer2
    ) {
        this.uid = JSON.parse(localStorage.getItem('usuario'));
        console.log(this.uid.uid);
        firebase.firestore().collection('users2').doc(this.uid.uid).get().then(userData => {
            this.name = userData.data().name;
            this.email = userData.data().email;
            this.dp = userData.data().dp;
            console.log('LINK DE ES' + this.dp);
        });
        firebase.firestore().collection('users2').get().then(userData => {
            userData.forEach(childData => {
                if (childData.data().uid !== this.uid.uid) {
                    this.users.push(childData.data());
                }

            });
        });
    }

    gotoChat(uid, name) {
        // sessionStorage.setItem('uid', uid);
        // sessionStorage.setItem('name', name);
        // this.nav.navigateForward('/chatuser');
        console.log('EL UID MIO ES');
        this.listeningCoords(uid);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getCurrentLocation();
        this.listeningCoords(this.uid.uid);
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    listeningCoords(uid2: string) {
        firebase.firestore().collection('CoordsUser').doc(uid2).onSnapshot
        (document => {

            this.lat = parseFloat(document.data().lat);
            this.long = parseFloat(document.data().long);
            this.myLatLng =
                {
                    lat: this.lat,
                    lng: this.long
                };
            console.log('las corrdenadas perro son' + this.lat);
            console.log('las corrdenadas perro son' + this.myLatLng);
            this.marker.setPosition(this.myLatLng);
        })
        ;
        firebase.firestore().collection('users2').doc(uid2).get().then(userData => {
            this.name = userData.data().name;
            this.email = userData.data().email;
            this.dp = userData.data().dp;
            console.log('NOMBRE ES' + this.name);
        });
    }

    async getCurrentLocation() {
        let load;
        // let myLatLng;
        load = await this.loadCtrl.create();
        load.present();
        console.log('COORDENADAS PROPIA SON: ', this.myLatLng);
        const mapEle: HTMLElement = document.getElementById('map');
        this.mapRef = new google.maps.Map(mapEle, {
            center: this.myLatLng,
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        // load.dismiss(); si es que
        google.maps.event
            .addListenerOnce(this.mapRef, 'idle', () => {
                console.log('cargado');
                this.addMarket(this.myLatLng.lat, this.myLatLng.lng);
                // this.marker.setPosition(myLatLng);

            });
        load.dismiss();
    }

    addMarket(lat: number, lng: number) {
        if (this.marker != null) {
            this.marker.setMap(null);
        }
        console.log('LOS MOVIMEINTOS RENDERIZABLES SON' + lat + lng);
        this.marker =
            new google.maps.Marker({
                position: {lat, lng},
                map: this.mapRef,
                title: this.name,
                draggable: true,
                // icon: {
                //     url: this.dp,
                //     scaledSize: new google.maps.Size(30, 30)
                // },
                // animation: google.maps.Animation.DROP,
            });
    }
}
