import { AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Geolocation} from '@capacitor/core';
declare var google;
@Component({
  selector: 'app-ubication',
  templateUrl: './ubication.page.html',
  styleUrls: ['./ubication.page.scss'],
})
export class UbicationPage implements OnInit, AfterContentInit {
  map;
  latitud: number;
  longitud: number;
  @ViewChild('mapElement') mapElement;
  constructor() { }
  ngOnInit(): void{
  }
  ngAfterContentInit(): void {
      this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          {
              center : {lat: -34.397, lng: 150.644},
              zoom: 8
          }
      );
  }

    async getCoordenadas(){
      const getCordenada = await Geolocation.getCurrentPosition();
      this.latitud = getCordenada.coords.latitude;
      this.longitud =  getCordenada.coords.longitude;
  }
}
