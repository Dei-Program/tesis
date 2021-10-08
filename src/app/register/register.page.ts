import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserRegister} from '../database/models/user-register';
import firestore from 'firebase';
import firebase from 'firebase';
import {AngularFireStorage} from '@angular/fire/storage';
import {FirestorageService} from '../services/firestorage.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    public name: string;
    public phone: string;
    public photo: string;
    cedula: string;
    newImage = '';
    newFile = '';
    RegisterUsers: UserRegister;

    constructor(
        private authService: AuthService, private router: Router, private db: AngularFirestore,
        public firestorageService: FirestorageService) {
        this.RegisterUsers = {} as UserRegister;
    }

    ngOnInit() {
    }

    async onRegister() {
        try {
            const path = 'Productos';
            const name = this.name;
            const res = await this.firestorageService.uploadImage(this.newFile, path, name);
            this.photo = res;
            console.log(this.photo);
            const user = await this.authService.register(this.RegisterUsers.email1, this.RegisterUsers.password,
                this.name, this.phone, this.photo, this.cedula);
            if (user) {
                const isVerified = this.authService.isEmailVerified(user);
                this.redirectUser(isVerified);
                await this.authService.insertData('usersRole', this.RegisterUsers);
                console.log('TAREA CREADA PERROS');
                console.log(isVerified);
                this.RegisterUsers = {} as UserRegister;
            }
        } catch (error) {
            console.log('Error', error);
        }


    }

    private redirectUser(isVerified: boolean): void {
        if (isVerified) {
            this.router.navigate(['admin']);
            console.log(isVerified);
        } else {
            this.router.navigate(['verify-email']);
        }
    }

    async newImageUpload(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.newFile = event.target.files[0];
            const reader = new FileReader();
            reader.onload = ((image) => {
                this.newImage = image.target.result as string;
            });
            reader.readAsDataURL(event.target.files[0]);
        }
        // *******************************************

        // -----------------------------------
        // this.firestorageService.uploadImage().then(
        //   res => {
        //     console.log('recibir respuesta de la promesa', res);
        // }
        // );
        // console.log('fin de la funcion --> new imagenupload()');
    }
}
