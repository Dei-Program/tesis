import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AlertController} from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
@Component({
    selector: 'app-admin',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
    public email2 = true;
    uid;
    name;
    email;
    dp;
    users = [];

    constructor(private router: Router, public authService: AuthService,
                public alerta: AlertController, private vibration: Vibration,
                ) {
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
                if (childData.data().uid !== this.uid.uid) {
                    this.users.push(childData.data());
                }

            });
        });
    }

    ngOnInit() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase
                    .firestore()
                    .doc('/users/${user.uid}')
                    .get()
                    .then(userProfileSnapshot => {
                        this.email2 = userProfileSnapshot.data().email2;
                    });
            }
        });
    }

    // PARA DESLOGEAR
    // private salir(): void{
    //     try{
    //         if( this.authService.logout() === true){
    //         console.log(this.authService.logout());
    //         }
    //     }
    //     catch (error){console.log('Error-->', error);
    //     }
    // }
    public goUbication(): void {
        this.router.navigate(['ubication']);
    }

    public goChat(): void {
        this.router.navigate(['chat']);
    }

    public goRegistroUsuarios(): void {
        this.router.navigate(['listado']);
    }

    async alertaBasica() {
        const miAlerta = await this.alerta.create({
            header: '!ALERTA!',
            message: 'SE LE ALERTARA A TODOS LOS GUARDIAS',
            buttons: [' ENTENDIDO ', ' NO ENVIAR'],
        });
        await miAlerta.present();
    }
    vibrate(){
        this.vibration.vibrate(1000);
        console.log('VIBROOOOO');
    }
    public outlog(): void {
        this.router.navigate(['login']);
    }
    public goReport(): void {
        this.router.navigate(['report']);
    }
}