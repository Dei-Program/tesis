import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

declare var google;
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LoadingController} from '@ionic/angular';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-ubication',
    templateUrl: './ubication.page.html',
    styleUrls: ['./ubication.page.scss'],
})
export class UbicationPage implements OnInit {
    mapRef = null;
    constructor(
        private geolocation: Geolocation,
        private loadCtrl: LoadingController
    ) {
    }

    ngOnInit() {
        this.loadMap();
    }

    async loadMap() {
        const loading = await this.loadCtrl.create();
        loading.present();
        const rta = await this.geolocation.getCurrentPosition();
        const myLatLng = {
            lat: rta.coords.latitude,
            lng: rta.coords.longitude
        };
        console.log(myLatLng);
        const mapEle: HTMLElement = document.getElementById('map');
        this.mapRef = new google.maps.Map(mapEle, {
            center: myLatLng,
            zoom: 20
        });
        google.maps.event
            .addListenerOnce(this.mapRef, 'idle', () => {
                console.log('cargado');
                loading.dismiss();
                this.addMarket(myLatLng.lat, myLatLng.lng);
            });
    }
    private addMarket(lat: number, lng: number){
        const marker = new google.maps.Marker({
            position: {lat, lng},
            map: this.mapRef,
            title: 'Hello word'
        });
    }

}
