import { Component, OnInit } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NavController} from '@ionic/angular';
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  logs: string[] = [];
  constructor(public geolocation: Geolocation, public nav: NavController) { }
  ionViewDidLoad() {
    let hear = null;
    hear = this.geolocation.watchPosition();
    hear.subscribe( res =>
    {
      this.logs.push(' latitud :' + res.coords.latitude + 'longitud:' + res.coords.longitude);
    });
  }
  ngOnInit() { }

}
