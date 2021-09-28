import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RegisterPerson} from '../shared/user.interfaces';
import {FirestorageService} from '../services/firestorage.service';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-register-person',
    templateUrl: './register-person.page.html',
    styleUrls: ['./register-person.page.scss'],
})
export class RegisterPersonPage implements OnInit {
    newRegister: RegisterPerson = {
        nombre: '',
        cedula: null,
        fecha: '',
        hora: '',
        motivo: '',
        id: '',
    };
    fechaIngre: Date = new Date();

    constructor(private router: Router, public db: FirestorageService,
                public toastController: ToastController) {
    }

    ngOnInit() {
    }

    async save() {
        console.log('VAMOS A GUARDAR =>', this.newRegister);
        const data = this.newRegister;
        data.id = this.db.creatId();
        const enlace = 'UserRegister';
        await this.db.createDocument<RegisterPerson>(data, enlace, data.id).then(() => {
            this.presentToast('GUARDAO CON EXITO', 2000);
        });
    }

    async presentToast(mensaje: string, tiempo: number) {
        const toast = await this.toastController.create({
                message: ' EL registro tuvo exito!',
                duration: tiempo
            }
        );
        toast.present();

    }
    cambioFecha( event ){
console.log('ionCahnge', event);
    }
    public goMenu3(): void {
        this.router.navigate(['listado']);
    }
}
