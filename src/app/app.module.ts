import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment} from '../environments/environment';
import {ButtonModule} from 'primeng/button';
import { GoogleMapComponent} from './google-map/google-map.component';
import { Geolocation} from '@ionic-native/geolocation/ngx';
import {PushNotificationService} from './services/push-notification.service';
import { PipesPipe } from './pipes/pipes.pipe';
import {PipesModule} from './pipes/pipes.module';
import {MenuComponent} from './components/menu/menu.component';


@NgModule({
    declarations: [AppComponent,
        GoogleMapComponent, MenuComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
      PipesModule,
    ButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    Vibration,
    PushNotificationService,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
  exports: [MenuComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
