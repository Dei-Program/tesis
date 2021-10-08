import {Component, OnInit} from '@angular/core';
import {FirestorageService} from '../services/firestorage.service';
import {Producto} from '../shared/user.interfaces';

@Component({
    selector: 'app-users-admin',
    templateUrl: './users-admin.page.html',
    styleUrls: ['./users-admin.page.scss'],
})
export class UsersAdminPage implements OnInit {
    productos: Producto[] = [];
    private path = 'users2/';
    newProducto: Producto = {
        name: '',
        uid: this.firestoreService.creatId(),
        email: '',
        phone: '',
        dp: '',
        cedula: ''

    };

    constructor(public firestoreService: FirestorageService) {
    }

    ngOnInit() {
        this.getProductos();
    }

    getProductos() {
        this.firestoreService.getCollection<Producto>(this.path).subscribe(res => {
                console.log(res);
                this.productos = res;
            }
        );
    }

    deleteProducto(produto: Producto) {
        this.firestoreService.deleteDoc(this.path, produto.uid);
    }

    guardarUser() {
        this.firestoreService.createDocument(this.newProducto, this.path, this.newProducto.uid);
    }
}
