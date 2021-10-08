import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';
import {Router} from '@angular/router';
import {FirestorageService} from '../services/firestorage.service';
import {RegisterPerson} from '../shared/user.interfaces';

@Component({
    selector: 'app-listado',
    templateUrl: './listado.page.html',
    styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    data: any[] = Array(20);
    textoBuscar = '';
    fechaBuscar = '';
    fechaIngre: Date = new Date();

    constructor(
        private router: Router,
        public db: FirestorageService
    ) {
    }

    Items: RegisterPerson[] = [];

    loadData(event) {
        setTimeout(() => {
            console.log('Done');
            event.target.complete();

            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (this.data.length === 1000) {
                event.target.disabled = true;
            }
        }, 500);
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }


    ngOnInit() {
        console.log('registros -->', this.Items);
        this.getItem();
    }

    public goMenu3(): void {
        this.router.navigate(['admin']);
    }

    public goRegisterPerson(): void {
        this.router.navigate(['register-person']);
    }

    getItem() {
        const registerpath = 'UserRegister';
        this.db.getCollectionChanges<RegisterPerson>(registerpath).subscribe(
            res => {
                console.log(res);
                this.Items = res;
            }
        );
    }

    buscar(event) {
        this.textoBuscar = event.detail.value;
    }
    buscarFecha(event) {
        this.fechaBuscar = event.detail.value;
    }
    cambioFecha2(event) {
        console.log('ionCahnge', event);
    }
}
