import {AfterViewInit, Component, Input, Renderer2, OnInit, ElementRef} from '@angular/core';
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
export class UbicationPage implements OnInit, AfterViewInit {
    mapRef = null;
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
                if (childData.data().uid !== this.uid) {
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
        this.getCurrentLocation();
    }

    ngAfterViewInit() {
        this.listeningCoords(this.uid.uid);
        // this.locateUser();
    }

    async listeningCoords(uid2: string) {
        try {
            await firebase.firestore().collection('CoordsUser').doc(uid2).onSnapshot
            (document => {
                this.myLatLng =
                    {
                        lat: this.lat = document.data().lat,
                        lng: this.long = document.data().long
                    };
                console.log('las corrdenadas perro son' + this.lat);
                this.marker.setPosition(this.myLatLng);
            })
            ;
        } catch (error) {
            console.log('Error-->', error);
        }
    }

    async getCurrentLocation() {
        let load;
        // let myLatLng;
        load = await this.loadCtrl.create();
        load.present();
        console.log('COORDENADAS PROPIA SON: ', this.lat);
        this.myLatLng = {
            lat: this.lat,
            lng: this.long
        };
        console.log('COORDENADAS PROPIA SON: ', this.myLatLng);
        const mapEle: HTMLElement = document.getElementById('map');
        this.mapRef = new google.maps.Map(mapEle, {
            center: this.myLatLng,
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        // load.dismiss();
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
